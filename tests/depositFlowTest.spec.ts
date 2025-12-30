import test, { expect } from "@playwright/test";
import MainPage from "../PO/MainPage/MainPage";
import { DepModal } from "../PO/Components/DepModal";
import { testData } from "../testData/testData";
import NeosurfPage from "../PO/NeosurfPage/NeosurfPage";
import Methods from "../Methods/Methods";
import { vpnController } from "../helpers/vpnControllerInstance";

// Map regions to VPN locations
const regionToVpnLocation = {
    AU: "Australia - Melbourne",
    NZ: "New Zealand",
    CA: "Canada - Montreal",
    DE: "Germany - Frankfurt - 3"
};

test.describe("Deposit Flow Test", () => {
    const password = '193786Az()';
    let randomEmail: string;

    test('Verify deposit flow AU credit card', async ({ browser }) => {
        // Connect to Australian VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.AU);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page objects
        const mainPage = new MainPage(page);
        const depositModal = new DepModal(page);
        const methods = new Methods();

        await mainPage.navTo('http://kingbillywin24.com');
        await mainPage.clickAcceptCookies();
        const signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await methods.generateRandomEmail(10);
        await signUpModal.createAccount({ email: randomEmail, password });

        const creditCardData = {
            cardNumber: testData.AU.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.AU.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.AU.paymentMethods.creditCard.expiryDate,
            cvv: testData.AU.paymentMethods.creditCard.cvv,
            firstName: testData.AU.paymentMethods.creditCard.firstName,
            lastName: testData.AU.paymentMethods.creditCard.lastName,
            address: testData.AU.paymentMethods.creditCard.address,
            city: testData.AU.paymentMethods.creditCard.city,
            postalCode: testData.AU.paymentMethods.creditCard.postalCode,
            mobileNumber: testData.AU.paymentMethods.creditCard.mobileNumber
        };
        await depositModal.clickOnDepMethod('creditCardAU');
        await depositModal.selectDateFromDatePicker()
        await depositModal.chooseSatateAu();
        await depositModal.fillCreditCardField(creditCardData);
        await depositModal.page.waitForTimeout(60000);
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(60000);
        expect(depositModal.getDepModalError).toBeVisible({ timeout: 5000 });
    
        await expect(page).toHaveScreenshot('au_credit_card.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const auCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('au_credit_card.png', { body: auCreditCardScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    test('Verify deposit flow AU Neoserf', async ({ browser }) => {
        // Connect to Australian VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.AU);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page objects
        const mainPage = new MainPage(page);
        const depositModal = new DepModal(page);
        const neoserfPage = new NeosurfPage(page);
        const methods = new Methods();
        
        await mainPage.navTo('http://kingbillywin24.com');
        await mainPage.clickAcceptCookies();
        const signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await methods.generateRandomEmail(11);
        await signUpModal.createAccount({ email: randomEmail, password });
        await depositModal.clickOnDepMethod('neoserf');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(60000);
        const url = await depositModal.getPageUrl();
        expect(
            url.includes('pay2.secure-neosurf.com') || url.includes('pay.neosurf.com')
        ).toBe(true);
        expect(neoserfPage.getNeosurfPageLogo).toBeVisible();
        await expect(page).toHaveScreenshot('au_neoserf.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const auNeoserfScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('au_neoserf.png', { body: auNeoserfScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    test('Verify deposit flow NZ credit card', async ({ browser }) => {
        // Connect to New Zealand VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.NZ);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page objects
        const mainPage = new MainPage(page);
        const depositModal = new DepModal(page);
        const methods = new Methods();
        
        await mainPage.navTo('http://kingbillycasino.com');
        await mainPage.clickAcceptCookies();
        
        const signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await methods.generateRandomEmail(13);
        await signUpModal.createAccount({ email: randomEmail, password });
        const creditCardData = {
            cardNumber: testData.NZ.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.NZ.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.NZ.paymentMethods.creditCard.expiryDate,
            cvv: testData.NZ.paymentMethods.creditCard.cvv,
            firstName: testData.NZ.paymentMethods.creditCard.firstName,
            lastName: testData.NZ.paymentMethods.creditCard.lastName,
            address: testData.NZ.paymentMethods.creditCard.address,
            city: testData.NZ.paymentMethods.creditCard.city,
            postalCode: testData.NZ.paymentMethods.creditCard.postalCode,
            mobileNumber: testData.NZ.paymentMethods.creditCard.mobileNumber
        };
        await depositModal.selectDateFromDatePicker()
        await depositModal.clickOnDepMethod('creditCardNZ');
        // await depositModal.selectDateFromDatePicker();
        await depositModal.fillCreditCardFieldNZ(creditCardData);
        await depositModal.clickOnDepositButton();
        await expect(page).toHaveScreenshot('nz_credit_card.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const nzCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('nz_credit_card.png', { body: nzCreditCardScreenshot, contentType: 'image/png' });
        await depositModal.page.waitForTimeout(60000);
        expect(depositModal.getDepModalError).toBeVisible({ timeout: 5000 });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

     test('Verify deposit flow NZ paysafecard', async ({ browser }) => {
        // Connect to New Zealand VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.NZ);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page objects
        const mainPage = new MainPage(page);
        const depositModal = new DepModal(page);
        const methods = new Methods();

        await mainPage.navTo('http://kingbillycasino.com');
        await mainPage.clickAcceptCookies();
        const signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await methods.generateRandomEmail(12);
        await signUpModal.createAccount({ email: randomEmail, password });
        await depositModal.clickOnDepMethod('paysafecard');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(60000);
        expect(depositModal.getPaysafeCardModal).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveScreenshot('nz_paysafecard.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const nzPaysafecardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('nz_paysafecard.png', { body: nzPaysafecardScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    
    test('Verify deposit flow CA interact', async ({ browser }) => {
        // Connect to Canada VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.CA);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page objects
        const mainPage = new MainPage(page);
        const depositModal = new DepModal(page);

        await mainPage.navTo('http://kingbillycasino.com');
        await mainPage.clickAcceptCookies();
        const signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.CA.credentials.email);
        await signInModal.fillPassword(testData.CA.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.openDepositButton()
        await depositModal.clickOnDepMethod('interac');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(60000);
        expect(await mainPage.getPageUrl()).toContain('interac.express-connect.com');
        await expect(mainPage.page.locator('.otherPayments > p')).toContainText('Select your bank');
        await expect(page).toHaveScreenshot('ca_interac.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const caInteracScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('ca_interac.png', { body: caInteracScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    test('Verify deposit flow CA credit card', async ({ browser }) => {
        // Connect to Canada VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.CA);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page objects
        const mainPage = new MainPage(page);
        const depositModal = new DepModal(page);

        await mainPage.navTo('http://kingbillycasino.com');
        await mainPage.clickAcceptCookies();
        const signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.CA.credentials.email);
        await signInModal.fillPassword(testData.CA.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.openDepositButton()
        await depositModal.clickOnDepMethod('creditCardCA');
        await depositModal.fillCreditCardField({
            cardNumber: testData.CA.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.CA.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.CA.paymentMethods.creditCard.expiryDate,
            cvv: testData.CA.paymentMethods.creditCard.cvv,
            isCA: true,
        });
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(60000);
        await expect(depositModal.getDepModalError).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveScreenshot('ca_credit_card.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });
});