import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";





export default class MainPage extends BasePage {
    private mainPage: Page
    private allProviders: Locator
    private providersBlock: Locator

    private subcategoryDropdown: Locator
    private categorySlider: Locator
    private categoryTitle: Locator
    private lobbyCategory: Locator
    private newCategory: Locator
    private topCategory: Locator
    private popularCategory: Locator
    private jackpotsCategory: Locator
    private slotsCategory: Locator
    private accumulatingCategory: Locator
    private bonusBuyCategory: Locator
    private megawaysCategory: Locator
    private crashCategory: Locator
    private bookCategory: Locator
    private exclusiveCategory: Locator
    private liveCategory: Locator
    private blackjackCategory: Locator
    private rouletteCategory: Locator
    private baccaratCategory: Locator
    private pokerCategory: Locator
    private tableGamesCategory: Locator
    private tableOnlineRoulette: Locator
    private recentGamesCategory: Locator
    protected gameItem: Locator

    private topGamesShowMoreButton: Locator
    private newGamesShowMoreButton: Locator
    private promoShowMoreButton: Locator
    private gameItemSelector: string
    private getItButton: Locator
    private promoModal: Locator
    private sidebarButton: Locator
    private seccessRegPopUp: Locator
    private depositAndPlayPostReg: Locator
    private topWinnersSection: Locator
    private supportButton: Locator
    private sliderRegForm: Locator
    private kingsChoiceCategory: Locator



    private subCategoriesDropdown: (category: Locator) => Locator
    private provider: (index: number) => Locator
    private showMoreButton: (index: number) => Locator
    private topWinnerGame: (index: number) => Locator


    constructor(page: Page) {
        super(page);

        this.mainPage = page;

        this.allProviders = page.locator('.games-filter__cell--providers')
        this.providersBlock = page.locator('.menu-providers-select__content')


        this.categorySlider = page.locator('.games-filter__category')
        this.subcategoryDropdown = page.locator('.top-games-menu')
        this.categoryTitle = page.locator('.games__title')
        this.lobbyCategory = page.locator('#lobby_category')
        this.newCategory = page.getByRole('link', { name: 'New', exact: true })
        this.topCategory = page.getByRole('link', { name: 'Top', exact: true })
        this.popularCategory = page.getByRole('link', { name: 'Popular', exact: true })
        this.jackpotsCategory = page.locator('.home__filter .game-category-helper__name').filter({hasText: "Jackpots"}).nth(1)
        this.kingsChoiceCategory = page.locator('.home__filter .game-category-helper__name').filter({hasText: "King's Choice"}).nth(1)
        this.slotsCategory = page.locator('.home__filter .game-category-helper__name').filter({hasText: "Slots"}).nth(1)
        this.accumulatingCategory = page.locator('#slots_accumulating')
        this.bonusBuyCategory = page.locator('#slots_bonus_buy')
        this.megawaysCategory = page.locator('#slots_megaways')
        this.crashCategory = page.locator('#slots_crash')
        this.bookCategory = page.locator('#slots_book')
        this.exclusiveCategory = page.locator('#slots_exclusive')
        this.liveCategory = page.locator('.games-filter .game-category-helper__name').filter({hasText: "Live"}).nth(1)
        this.blackjackCategory = page.locator('#live_blackjack')
        this.rouletteCategory = page.locator('#live_roulette')
        this.baccaratCategory = page.locator('#live_baccarat')
        this.pokerCategory = page.locator('#live_poker')
        this.tableGamesCategory = page.locator('.home__filter .game-category-helper__name').filter({hasText: "Table games"}).nth(1)
        this.tableOnlineRoulette = page.locator('#table_online_roulette')
        this.recentGamesCategory = page.locator('#recent_games_category')
        this.gameItem = page.locator('.catalog__item')
        this.topGamesShowMoreButton = page.locator('#top_show_more_btn')
        this.newGamesShowMoreButton = page.locator('#new_show_more_btn')
        this.promoShowMoreButton = page.locator('#main_pg_promo_show_more')
        this.getItButton = page.locator('.banner-slide__button ')
        this.promoModal = page.locator('.promo-modal__container')
        this.sidebarButton = page.locator('#burger_menu_btn')
        this.seccessRegPopUp = page.locator('.modal__content')
        this.depositAndPlayPostReg = page.locator('#deposit_play_btn')
        this.topWinnersSection = page.locator('.jackpot-winners-section-home')
        this.supportButton = page.locator(`body .intercom-lightweight-app-launcher-icon-open`)
        this.sliderRegForm = page.locator('.main-slide-anon__register-form')


        this.gameItemSelector = '.catalog__item'

        this.subCategoriesDropdown = (category: Locator) => category.locator(`.game-category-helper__btn`)
        this.provider = (index) => page.locator(`#games-page-providers-filter-item-${index}`)
        this.showMoreButton = (index) => page.locator(`.home-slider__top .home-slider__see-more-btn:nth-of-type(${index})`)
        this.topWinnerGame = (index: number) => page.locator(`.winners-game__wrap div[data-index='${index}']`)
    }

    
    async openGameCategory(gameCategory: Locator): Promise<void> {
        await gameCategory.click()
        const isClickable = await gameCategory.isVisible()
        if (!isClickable) {
            await this.page.locator('#slider_arrow_right').click()
            await this.openGameCategory(gameCategory)
        }
    }

    async clickOnCategoryDropdown(element: string){
        await this.page.locator(element).nth(2).click()
    }
    async getCategoryTitleName(): Promise<string>{
        return await this.categoryTitle.innerText()
    }

    async openShowMore(index: number): Promise<void> {
        await this.showMoreButton(index).click()
    }

    async openAllProviders(): Promise<void> {
        await this.allProviders.click()
    }

    async getAllProviders(): Promise<Array<string>>{
        await this.openAllProviders()

        return await this.page.evaluate(() => {
            const allProviders = document.querySelector('.menu-providers-select__content');
            if (!allProviders){
                return []
            }
            const providersList = (allProviders as HTMLElement).innerText;
            

            return providersList.split("\n").map((provider: string) => provider.trim().replace(/\d+$/g, '')).filter((provider: string) => provider !== "")
        })
    }

    async clickOnProvider(index: number): Promise<void> {
        await this.provider(index).click()
    }

    async getProviderName(index: number): Promise<string> {
        const str = await this.provider(index).innerText()

        const providerName = str.replace(/\d+$/g, '').trim()

        return providerName
    }

    async getNumberOfGames(): Promise<number>{
        return await this.gameItem.count()
    }

    async openSubcategory(category: Locator): Promise<void> {
        await this.subCategoriesDropdown(category).click()
    }

    async clickOnTopShowMoreButton(): Promise<void> {
        await this.topGamesShowMoreButton.click()
    }

    async clickOnNewShowMoreButton(): Promise<void> {
        await this.newGamesShowMoreButton.click()
    }

    async clickOnPromoShowMoreButton(): Promise<void> {
        await this.promoShowMoreButton.click()
    }

    async clickOnGetItButton(): Promise<void> {
        await this.getItButton.nth(1).click()
    }


    async getNumberOfTopWinnerGames(): Promise<number> {
        const numberOfGames = await this.page.evaluate(() => {
            const gameItems = document.querySelectorAll('.winners-game__item')

            return gameItems.length
        })
        if (numberOfGames < 1){
            throw new Error('No top winner games found')
        }

        return numberOfGames
    }

    async clickOnTopWinnersGame(index: number): Promise<void> {

        await this.topWinnerGame(index).click()
    }



    //accessors

    get getCategorySlider(): Locator {
        return this.categorySlider
    }

    get getSubCategoryDropdown(): Locator {
        return this.subcategoryDropdown
    }

    get getPromoModal(): Locator {
        return this.promoModal
    }

    get lobby(): Locator {
        return this.lobbyCategory
    }

    get new(): Locator {
        return this.newCategory
    }

    get top(): Locator {
        return this.topCategory
    }

    get popular(): Locator {
        return this.popularCategory
    }

    get jackpots(): Locator {
        return this.jackpotsCategory
    }

    get slots(): Locator {
        return this.slotsCategory
    }

    get accumulating(): Locator {
        return this.accumulatingCategory
    }

    get bonusBuy(): Locator {
        return this.bonusBuyCategory
    }

    get megaways(): Locator {
        return this.megawaysCategory
    }

    get crash(): Locator {
        return this.crashCategory
    }

    get book(): Locator {
        return this.bookCategory
    }

    get exclusive(): Locator {
        return this.exclusiveCategory
    }

    get live(): Locator {
        return this.liveCategory
    }

    get blackjack(): Locator {
        return this.blackjackCategory
    }

    get roulette(): Locator {
        return this.rouletteCategory
    }

    get baccarat(): Locator {
        return this.baccaratCategory
    }

    get poker(): Locator {
        return this.pokerCategory
    }

    get tableGames(): Locator {
        return this.tableGamesCategory
    }

    get tableOnline(): Locator {
        return this.tableOnlineRoulette
    }

    get recentGames(): Locator {
        return this.recentGamesCategory
    }

    get getGameItemSelector(): string {
        return this.gameItemSelector
    }

    get getPromoShowMoreButton(): Locator {
        return this.promoShowMoreButton
    }

    get getSuccessRegPopUp(): Locator {
        return this.seccessRegPopUp
    }

    get getTopWinnersSection(): Locator {
        return this.topWinnersSection
    }

    get getsliderRegForm(): Locator {
        return this.sliderRegForm
    }
}