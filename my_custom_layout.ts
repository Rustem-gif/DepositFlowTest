import { Block, KnownBlock } from '@slack/types';
import { SummaryResults } from 'playwright-slack-report/dist/src';
import { WebClient } from '@slack/web-api';
import fs from 'fs';



// Outstanding Block Kit layout for Playwright results
export default async function generateCustomLayoutAsync(
  summaryResults: SummaryResults,
): Promise<Array<KnownBlock | Block>> {
  const slackClient = new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN);
  const slackChannelId = process.env.SLACK_CHANNEL_ID;
  const blocks: Array<KnownBlock | Block> = [];
  // Header
  blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🎭 Deposit Flow test',
      emoji: true,
    },
  });

  // Summary section
  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Summary:*
  > ✅ *Passed:* ${summaryResults.tests.filter(t => t.status === 'passed').length}   ❌ *Failed:* ${summaryResults.tests.filter(t => t.status === 'failed' || t.status === 'timedOut').length}   ⏩ *Skipped:* ${summaryResults.tests.filter(t => t.status === 'skipped').length}   🧪 *Total:* ${summaryResults.tests.length}`,
    },
    block_id: 'summary-block',
  });

  // Meta/context info
  if (summaryResults.meta && summaryResults.meta.length) {
    blocks.push({ type: 'divider' });
    blocks.push({
      type: 'context',
      elements: summaryResults.meta.map(({ key, value }) => ({
        type: 'mrkdwn',
        text: `*${key}*: ${value}`,
      })),
      block_id: 'meta-block',
    });
  }

  blocks.push({ type: 'divider' });

  // Attach screenshots and videos for all tests
  for (const test of summaryResults.tests) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${test.name}*\n• *Status:* ${test.status}\n• *Browser:* ${test.browser || 'N/A'}`,
      },
      block_id: `test-${test.name.replace(/\W/gi, '-')}`,
    });
    if (test.attachments && test.attachments.length && slackChannelId) {
      for (const a of test.attachments) {
        let filePath = a.path;
        let fileBuffer = a.body;
        let fileName = a.name || 'attachment.png';

        if (fileBuffer) {
          try {
            const uploadResult = await slackClient.filesUploadV2({
              channel_id: slackChannelId,
              file: fileBuffer,
              filename: fileName,
            });
            const file = uploadResult.files && uploadResult.files[0];
            if (file && (file as any).url_private) {
              blocks.push({
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `:paperclip: <${(file as any).url_private}|${fileName}>`,
                },
                block_id: `${fileName}-${test.name.replace(/\W/gi, '-')}`,
              });
            }
          } catch (err) {
            blocks.push({
              type: 'context',
              elements: [{ type: 'mrkdwn', text: `:warning: Failed to upload ${fileName} for ${test.name}` }],
            });
          }
        } else {
          // If the file does not exist at the default path, try playwright-report/data
          if (!filePath || !fs.existsSync(filePath)) {
            const altPath = require('path').resolve(__dirname, 'playwright-report', 'data', a.name);
            if (fs.existsSync(altPath)) filePath = altPath;
          }
          if (filePath && fs.existsSync(filePath)) {
            try {
              const uploadResult = await slackClient.filesUploadV2({
                channel_id: slackChannelId,
                file: fs.createReadStream(filePath),
                filename: filePath.split(/[\\/]/).pop(),
              });
              const file = uploadResult.files && uploadResult.files[0];
              if (file && (file as any).url_private) {
                blocks.push({
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `:paperclip: <${(file as any).url_private}|${a.name}>`,
                  },
                  block_id: `${a.name}-${test.name.replace(/\W/gi, '-')}`,
                });
              }
            } catch (err) {
              blocks.push({
                type: 'context',
                elements: [{ type: 'mrkdwn', text: `:warning: Failed to upload ${a.name} for ${test.name}` }],
              });
            }
          }
        }
      }
    }
    blocks.push({ type: 'divider' });
  }

  // Optionally, add a summary of all tests (uncomment if needed)
 blocks.push({ type: 'divider' });
 blocks.push({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*All Tests:*\n${summaryResults.tests.map(t => `${t.status === 'failed' ? '❌' : t.status === 'skipped' ? '⏩' : '✅'} ${t.name}`).join('\n')}`,
  },
  block_id: 'all-tests',
});

  // Ensure we return a valid array of blocks (not a string or object)
  if (!Array.isArray(blocks)) {
    return [];
  }
  return blocks;
}
