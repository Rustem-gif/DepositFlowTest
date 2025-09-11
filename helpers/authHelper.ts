import { Page, APIRequestContext } from '@playwright/test';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  id: number;
  email: string;
  auth_fields_missed: string[];
  statuses: Array<{
    name: string;
    id: string;
  }>;
  created_at: string;
  current_sign_in_at: string;
  confirmed_at: string;
  deposit_bonus_code: string | null;
  can_issue_bonuses: boolean;
  profession: string | null;
  middle_name: string | null;
  autoregistered: boolean;
  autologin_link: string | null;
  verified: boolean;
  license_name: string;
  sow_questionnaire_requested: boolean;
  sow_questionnaire_expires_at: string | null;
  user_account_status: string;
  all_payment_methods_verified: boolean;
  two_factor_enabled: boolean;
  banking_details: any[];
  address: string;
  agreed_to_partner_promotions: boolean;
  city: string;
  country: string;
  date_of_birth: string;
  first_name: string;
  gender: string;
  last_name: string;
  nickname: string;
  postal_code: string;
  receive_promos: boolean;
  receive_promos_via_phone_calls: boolean;
  receive_sms_promos: boolean;
  state: string;
  title: string;
  currency: string;
  language: string;
  mobile_phone: string;
}

export class AuthHelper {
  constructor(
    private page: Page,
    private request: APIRequestContext
  ) {}

  /**
   * Sign in using API endpoint - faster and more reliable than UI
   * @param credentials - User email and password
   * @returns Promise<SignInResponse> - User data from successful login
   */
  async signInViaAPI(credentials: SignInCredentials): Promise<SignInResponse> {
    console.log(`Signing in user: ${credentials.email}`);

    // Make API request to sign in endpoint
    const response = await this.request.post('https://www.kingbillycasino.com/api/users/sign_in', {
      headers: {
        'Accept': 'application/vnd.s.v1+json',
        'Content-Type': 'application/json',
        'Origin': 'https://www.kingbillycasino.com',
        'Referer': 'https://www.kingbillycasino.com/?sign-in=modal',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
      },
      data: {
        user: {
          email: credentials.email,
          password: credentials.password
        }
      }
    });

    if (response.status() !== 201) {
      const errorText = await response.text();
      throw new Error(`Sign in failed with status ${response.status()}: ${errorText}`);
    }

    const userData: SignInResponse = await response.json();
    
    // Extract session cookies from response
    await this.request.dispose();
    await this.request.storageState({ path: 'state.json' });

    console.log(`Successfully signed in user: ${userData.email} (ID: ${userData.id})`);
    return userData;
  }

}