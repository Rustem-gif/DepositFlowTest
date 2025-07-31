import test from "@playwright/test";
import MainPage from "../PO/MainPage/MainPage";
import SignInModal from "../PO/MainPage/Component/SignInModal";

test.describe("Deposit Flow Test", () => {
    let mainPage: MainPage;
    let signInModal: SignInModal
    
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);

        await mainPage.navTo('/');
        await mainPage.clickAcceptCookies();
        signInModal = await mainPage.header.clickSignIn();
    });

    test('Verify deposit flow AU credit card', async ({ page }) => {
        await signInModal.fillEmail(testData.AU.credentials.email);
        await signInModal.fillPassword(testData.AU.credentials.password);
        await signInModal.clickSignIn();

        await mainPage.header.clickDepositButton();
        
    });

});