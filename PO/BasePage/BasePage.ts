import {Page, Locator} from "@playwright/test";
import Header from "../Components/Header";

export default class BasePage {
  readonly page: Page
  readonly header: Header
  private acceptCookiesButton: Locator
  readonly scrollUpButton: Locator


  constructor(page: Page) {
    this.page = page;

    this.scrollUpButton = this.page.locator('.btn-scroll-top')
    this.acceptCookiesButton = this.page.locator('#accept_initial_notification_button')

    this.header = new Header(this.page)
   
  }

  
  async navTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async sleep(miliseconds: number): Promise<void> {
    await this.page.waitForTimeout(miliseconds);
  }

  async getPageUrl(): Promise<string>{
    return this.page.url()
  }

  async scrollTo(locator: Locator): Promise<void>{
    await locator.scrollIntoViewIfNeeded()
  }

  async clickAcceptCookies(): Promise<void>{
    await this.acceptCookiesButton.click()
  }

  async waitForSelector(locator: Locator): Promise<void>{
    await locator.waitFor({state: "visible"})
  }

  get getScrollUpButton(): Locator {
    return this.scrollUpButton
  }
}