import test, { expect } from "@playwright/test";
import MainPage from "../PO/MainPage/MainPage";
import SignInModal from "../PO/MainPage/Component/SignInModal";
import SignUpModal from "../PO/MainPage/Component/SignUpModal";

import { DepModal } from "../PO/Components/DepModal";
import { testData } from "../testData/testData";
import { vpnController } from '../helpers/vpnControllerInstance';
import NeosurfPage from "../PO/NeosurfPage/NeosurfPage";

test.describe("Deposit Flow Test", () => {
    let mainPage: MainPage;
    let signInModal: SignInModal;
    let signUpModal: SignUpModal;
    let depositModal: DepModal;
    let randomEmail: string;
    let neoserfPage: NeosurfPage;
    const password = '193786Az()'

    // Helper function to handle VPN connection with debug mode support
    async function connectVPN(location: string, page: any) {
        // In debug mode, skip VPN to avoid browser context issues
        if (process.env.PWDEBUG) {
            console.log(`Debug mode: Skipping VPN connection to ${location}`);
            await new Promise(res => setTimeout(res, 1000));
            return;
        }

        // Switch VPN and wait for connection
        await vpnController.vpnConnect(location);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) { // up to 30s
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error(`VPN not connected to ${location}`);

        // Wait for network to stabilize after VPN switch
        await new Promise(res => setTimeout(res, 3000));
    }

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        depositModal = new DepModal(page);
        neoserfPage = new NeosurfPage(page);
        // No VPN switch or navTo in beforeEach, do it in each test for locale
        
        // In debug mode, add extra stability wait
        if (process.env.PWDEBUG) {
            await new Promise(res => setTimeout(res, 2000));
        }
    });

    test.afterAll(async () => {
        // Disconnect VPN after all tests for cleanup (skip in debug mode)
        if (!process.env.PWDEBUG) {
            await vpnController.vpnDisconnect();
        }
    });

    test('Verify deposit flow AU credit card', async ({ page }) => {
        // Connect VPN with debug mode support
        await connectVPN(testData.AU.vpnLocation, page);

        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await signUpModal.generateRandomEmail(10);
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
        await depositModal.page.waitForTimeout(30000);
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(depositModal.getDepModalError).toBeVisible({ timeout: 5000 });
    
        await expect(page).toHaveScreenshot('au_credit_card.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const auCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('au_credit_card.png', { body: auCreditCardScreenshot, contentType: 'image/png' });
    });

    test('Verify deposit flow AU Neoserf', async ({ page }) => {
        // Switch VPN to AU and wait for connection
        await vpnController.vpnConnect(testData.AU.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to AU');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await signUpModal.generateRandomEmail(11);
        await signUpModal.createAccount({ email: randomEmail, password });
        await depositModal.clickOnDepMethod('neoserf');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        const url = await depositModal.getPageUrl();
        expect(
            url.includes('pay2.secure-neosurf.com') || url.includes('pay.neosurf.com')
        ).toBe(true);
        expect(neoserfPage.getNeosurfPageLogo).toBeVisible();
        await expect(page).toHaveScreenshot('au_neoserf.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const auNeoserfScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('au_neoserf.png', { body: auNeoserfScreenshot, contentType: 'image/png' });

    })

    test('Verify deposit flow NZ credit card', async ({ page }) => {
        // Switch VPN to NZ and wait for connection
        await vpnController.vpnConnect(testData.NZ.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to NZ');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        await expect(page).toHaveScreenshot('nz_credit_card.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const nzCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('nz_credit_card.png', { body: nzCreditCardScreenshot, contentType: 'image/png' });
        signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await signUpModal.generateRandomEmail(13);
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
        await depositModal.clickOnDepMethod('creditCardNZ');
        await depositModal.selectDateFromDatePicker();
        await depositModal.fillCreditCardFieldNZ(creditCardData);
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(depositModal.getDepModalError).toBeVisible({ timeout: 5000 });
    });

     test('Verify deposit flow NZ paysafecard', async ({ page }) => {
        // Switch VPN to NZ and wait for connection
        await vpnController.vpnConnect(testData.NZ.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to NZ');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signUpModal = await mainPage.header.clickCreateAccount();
        randomEmail = await signUpModal.generateRandomEmail(12);
        await signUpModal.createAccount({ email: randomEmail, password });
        await depositModal.clickOnDepMethod('paysafecard');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(depositModal.getPaysafeCardModal).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveScreenshot('nz_paysafecard.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const nzPaysafecardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('nz_paysafecard.png', { body: nzPaysafecardScreenshot, contentType: 'image/png' });
    });

    
    test('Verify deposit flow CA interact', async ({ page }) => {
        // Switch VPN to CA and wait for connection
        await vpnController.vpnConnect(testData.CA.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to CA');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.CA.credentials.email);
        await signInModal.fillPassword(testData.CA.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton()
        await depositModal.clickOnDepMethod('interac');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(await mainPage.getPageUrl()).toContain('interac.express-connect.com');
        expect(mainPage.page.locator('.otherPayments > p')).toContainText('Select your bank');
        await expect(page).toHaveScreenshot('ca_interac.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const caInteracScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('ca_interac.png', { body: caInteracScreenshot, contentType: 'image/png' });

    });

    test('Verify deposit flow CA credit card', async ({ page }) => {
        // Switch VPN to CA and wait for connection
        await vpnController.vpnConnect(testData.CA.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to CA');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        await expect(page).toHaveScreenshot('ca_credit_card.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const caCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('ca_credit_card.png', { body: caCreditCardScreenshot, contentType: 'image/png' });
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.CA.credentials.email);
        await signInModal.fillPassword(testData.CA.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton()
        await depositModal.clickOnDepMethod('creditCardCA');
        await depositModal.fillCreditCardField({
            cardNumber: testData.CA.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.CA.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.CA.paymentMethods.creditCard.expiryDate,
            cvv: testData.CA.paymentMethods.creditCard.cvv
        });
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(depositModal.getDepModalError).toBeVisible({ timeout: 5000 });
    })

    test('Verify deposit flow DE sparkasse', async ({ page }) => {
        // Switch VPN to DE and wait for connection
        await vpnController.vpnConnect(testData.DE.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to DE');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.DE.credentials.email);
        await signInModal.fillPassword(testData.DE.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton();
        await depositModal.clickOnDepMethod('sparkasseDE');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(await mainPage.getPageUrl()).toContain('rapidob.com');
        expect(mainPage.page.locator('#shadow-content .header-back-bank-name')).toContainText('Sparkasse');
        await expect(page).toHaveScreenshot('de_sparkasse.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const deSparkasseScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('de_sparkasse.png', { body: deSparkasseScreenshot, contentType: 'image/png' });
    });

    test('Verify deposit flow DE deutscheBank', async ({ page }) => {
        // Switch VPN to DE and wait for connection
        await vpnController.vpnConnect(testData.DE.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to DE');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.DE.credentials.email);
        await signInModal.fillPassword(testData.DE.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton();
        await depositModal.clickOnDepMethod('deutscheBankDE');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(await mainPage.getPageUrl()).toContain('rapidob.com');
        expect(mainPage.page.locator('#shadow-content .header-back-bank-name')).toContainText('Deutsche Bank');
        await expect(page).toHaveScreenshot('de_deutschebank.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const deDeutscheBankScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('de_deutschebank.png', { body: deDeutscheBankScreenshot, contentType: 'image/png' });
    });

    test('Verify deposit flow DE postbank', async ({ page }) => {
        // Switch VPN to DE and wait for connection
        await vpnController.vpnConnect(testData.DE.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to DE');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.DE.credentials.email);
        await signInModal.fillPassword(testData.DE.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton();
        await depositModal.clickOnDepMethod('postbankDE');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(await mainPage.getPageUrl()).toContain('rapidob.com');
        expect(mainPage.page.locator('#shadow-content .header-back-bank-name')).toContainText('Postbank');
        await expect(page).toHaveScreenshot('de_postbank.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const dePostbankScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('de_postbank.png', { body: dePostbankScreenshot, contentType: 'image/png' });
    });

    test('Verify deposit flow revolut', async ({ page }) => {
        // Switch VPN to DE and wait for connection
        await vpnController.vpnConnect(testData.DE.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to DE');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.DE.credentials.email);
        await signInModal.fillPassword(testData.DE.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton();
        await depositModal.clickOnDepMethod('revolut');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(await mainPage.getPageUrl()).toContain('rapidob.com');
        expect(mainPage.page.locator('#shadow-content .header-back-bank-name')).toContainText('Revolut');
        await expect(page).toHaveScreenshot('de_revolut.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const deRevolutScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('de_revolut.png', { body: deRevolutScreenshot, contentType: 'image/png' });
    });

    test('Verify deposit flow nodaPay', async ({ page }) => {
        // Switch VPN to DE and wait for connection
        await vpnController.vpnConnect(testData.DE.vpnLocation);
        let vpnStatus = '';
        for (let i = 0; i < 30; i++) {
            vpnStatus = await vpnController.vpnCheckStatus();
            if (vpnStatus === 'connected') break;
            await new Promise(res => setTimeout(res, 6000));
        }
        if (vpnStatus !== 'connected') throw new Error('VPN not connected to DE');
        await new Promise(res => setTimeout(res, 3000));
        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.DE.credentials.email);
        await signInModal.fillPassword(testData.DE.credentials.password);
        await signInModal.clickSignIn();
        await mainPage.header.clickDepositButton();
        await depositModal.clickOnDepMethod('nodaPay');
        await depositModal.clickOnDepositButton();
        await depositModal.page.waitForTimeout(30000);
        expect(await mainPage.getPageUrl()).toContain('rapidob.com');
        expect(await mainPage.page.locator('.modal-content')).toBeVisible();
        await expect(page).toHaveScreenshot('de_nodapay.png', { fullPage: false, maxDiffPixelRatio: 0.05, threshold: 0.3 });
        const deNodapayScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('de_nodapay.png', { body: deNodapayScreenshot, contentType: 'image/png' });
    });
});
