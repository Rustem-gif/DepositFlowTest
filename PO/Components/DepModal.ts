import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";


type DepMethod = 'creditCard' | 'neoserf' | 'paysafecard' | 'interac' | 'creditCardAU' | 'creditCardNZ' | 'creditCardCA' | 'creditCardDE';
export class DepModal extends BaseComponent {
    private depModal: Locator
    private creditCardAU: Locator
    private neoserf: Locator
    private paysafecard: Locator
    private creditCardNZ: Locator
    private interac: Locator
    private creditCardCA: Locator
    private creditCardDE: Locator

    constructor(page: Page) {
        super(page);

        this.depModal = page.locator('.fast-deposit-modal')
        this.creditCardAU = page.locator("[data-method-id='devcode_devcode-creditcard-352_creditcard']")
        this.creditCardNZ = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-278_card-acquirer']")
        this.creditCardCA = page.locator("[data-method-id='devcode_devcode-creditcard-331_creditcard']")
        this.creditCardDE = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-313_card-acquirer']")
        this.neoserf = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-neosurf~neosurf-175_neosurf~neosurf']")
        this.paysafecard = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-skrill~skrill-paysafecard-300_skrill~skrill-paysafecard']")
        this.interac = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-interac~interac-316_interac~interac']")
    }


    get getDepModal(): Locator {
        return this.depModal
    }

    async getdepMethod(depMethod: DepMethod): Promise<Locator> {
        switch (depMethod) {
            case 'creditCardAU':
                return this.creditCardAU;
            case 'creditCardNZ':
                return this.creditCardNZ;
            case 'creditCardCA':
                return this.creditCardCA;
            case 'creditCardDE':
                return this.creditCardDE;
            case 'neoserf':
                return this.neoserf;
            case 'paysafecard':
                return this.paysafecard;
            case 'interac':
                return this.interac;
            default:
                throw new Error(`Unknown deposit method: ${depMethod}`);
        }
    }

}