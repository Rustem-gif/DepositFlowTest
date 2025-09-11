import { Locator, Page } from "@playwright/test";

export default class NeosurfPage {

    private page: Page;
    private neosurfPageLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.neosurfPageLogo = page.locator('.logo');
    }
    

    get getNeosurfPageLogo(): Locator {
        return this.neosurfPageLogo;
    }
}