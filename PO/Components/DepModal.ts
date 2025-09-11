import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";

type DepMethod = 'creditCard' | 'neoserf' | 'paysafecard' | 'interac' | 'creditCardAU' | 'creditCardNZ' | 'creditCardCA' | 'creditCardDE'  | 'sparkasseDE' | 'deutscheBankDE' | 'postbankDE' | 'revolut' | 'nodaPay';
export class DepModal extends BaseComponent {
    private depModal: Locator
    private creditCardAU: Locator
    private neoserf: Locator
    private paysafecard: Locator
    private creditCardNZ: Locator
    private interac: Locator
    private creditCardCA: Locator
    private creditCardDE: Locator
    private creditCardNumberInput: Locator
    private cardHolderNameInput: Locator
    private expiryDataInput: Locator
    private cvvInput: Locator
    private firstNameInput: Locator
    private lastNameInput: Locator
    private dateOfBirthInput: Locator
    private stateSelect: Locator
    private cityInput: Locator
    private addressInput: Locator
    private postalCodeInput: Locator
    private mobileFormInput: Locator
    private depositButton: Locator
    private depModalError: Locator
    private paysafeCardModal: Locator
    // NZ credit card specific locators
    private nzCardNumberInput: Locator
    private nzCardHolderNameInput: Locator
    private nzExpiryDateInput: Locator
    private nzCvvInput: Locator
    private nzFirstNameInput: Locator
    private nzLastNameInput: Locator
    private nzCityInput: Locator
    private nzAddressInput: Locator
    private nzPostalCodeInput: Locator
    private nzMobileFormInput: Locator
    private creditCardNumberInpuitNZ: Locator
    private sparkasseDE: Locator
    private deutscheBankDE: Locator
    private postbankDE: Locator
    private revolut: Locator
    private nodaPay: Locator

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
        this.creditCardNumberInput = page.locator('#encCreditcardNumber')
        this.cardHolderNameInput = page.locator('.payment-dynamic-form__card-holder > input')
        this.expiryDataInput = page.locator('#expiry_date')
        this.cvvInput = page.locator('#encCvv')
        this.firstNameInput = page.locator('#dynamic-form__first_name')
        this.lastNameInput = page.locator('#dynamic-form__last_name')
        this.dateOfBirthInput = page.locator('xpath=/html/body/div[2]/div/div[2]/div/div/div[2]/div[2]/div[4]/form/div/div[3]/div[1]/div/div/div/input')
        this.stateSelect = page.locator('#dynamic-form__state')
        this.cityInput = page.locator('#dynamic-form__city')
        this.addressInput = page.locator('#dynamic-form__address')
        this.postalCodeInput = page.locator('#dynamic-form__postal_code')
        this.mobileFormInput = page.locator('#dynamic-form__mobile_phone-number')

        this.depositButton = page.locator('.payment-submit-default__button')
        this.depModalError = page.locator('#payment_common_error')
        this.paysafeCardModal = page.locator('.payments-lib-popup__content')

        // NZ credit card specific locators
        this.nzCardNumberInput = page.locator('.payment-dynamic-form__credit-card-number > input');
        this.nzCardHolderNameInput = page.locator('.payment-dynamic-form__card-holder > input');
        this.nzExpiryDateInput = page.locator('.payment-dynamic-form__card-expiry-date > input');
        this.nzCvvInput = page.locator('.payment-dynamic-form__cvv > input');
        this.nzFirstNameInput = page.locator('#dynamic-form__first_name');
        this.nzLastNameInput = page.locator('#dynamic-form__last_name');
        this.nzCityInput = page.locator('#dynamic-form__city');
        this.nzAddressInput = page.locator('#dynamic-form__address');
        this.nzPostalCodeInput = page.locator('#dynamic-form__postal_code');
        this.nzMobileFormInput = page.locator('#dynamic-form__mobile_phone-number');

        this.creditCardNumberInpuitNZ = this.nzCardNumberInput;

        this.sparkasseDE = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~sparkasse-germany-351_noda~sparkasse-germany']")
        this.deutscheBankDE = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~deutsche-bank-germany-348_noda~deutsche-bank-germany']")
        this.postbankDE = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~postbank-germany-349_noda~postbank-germany']")
        this.revolut = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~revolut-germany-350_noda~revolut-germany']")
        this.nodaPay = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~noda-320_noda~noda']")
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
            case 'sparkasseDE':
                return this.sparkasseDE;
            case 'deutscheBankDE':
                return this.deutscheBankDE;
            case 'postbankDE':
                return this.postbankDE;
            case 'revolut':
                return this.revolut;
            case 'nodaPay':
                return this.nodaPay;
            default:
                throw new Error(`Unknown deposit method: ${depMethod}`);
        }
    }

    async clickOnDepMethod(depMethod: DepMethod): Promise<void> {
        const methodLocator = await this.getdepMethod(depMethod);
        await methodLocator.click();
    }

    async clickOnDepositButton(): Promise<void> {
        await this.depositButton.click();
    }

   async selectDateFromDatePicker(): Promise<void> {
    await this.dateOfBirthInput.click();
    await this.page.locator('.react-datepicker__month > .react-datepicker__week  > .react-datepicker__day[aria-disabled="false"]:nth-of-type(1)').first().click();
    }

    async chooseSatateAu(){
        await this.stateSelect.click();
        await this.page.locator('#dynamic-form__state-item-0').click();
    }

    async fillCreditCardField({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
        firstName,
        lastName,
        city,
        address,
        postalCode,
        mobileNumber,
        isNZ = false
    }: {
        cardNumber?: string;
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        mobileNumber?: string;
        isNZ?: boolean;
    }) {
        if (isNZ) {
            await this.fillCreditCardFieldNZ({
                cardNumber,
                cardHolderName,
                expiryDate,
                cvv,
                firstName,
                lastName,
                city,
                address,
                postalCode,
                mobileNumber
            });
            return;
        }
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.creditCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.cardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.expiryDataInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.cvvInput.fill(cvv);
        }
        if (firstName !== undefined && firstName !== null) {
            await this.firstNameInput.fill(firstName);
        }
        if (lastName !== undefined && lastName !== null) {
            await this.lastNameInput.fill(lastName);
        }
        if (city !== undefined && city !== null) {
            await this.cityInput.fill(city);
        }
        if (address !== undefined && address !== null) {
            await this.addressInput.fill(address);
        }
        if (postalCode !== undefined && postalCode !== null) {
            await this.postalCodeInput.fill(postalCode);
        }
        if (mobileNumber !== undefined && mobileNumber !== null) {
            await this.mobileFormInput.fill(mobileNumber);
        }
    }

    // Dedicated NZ credit card field filler
    async fillCreditCardFieldNZ({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
        firstName,
        lastName,
        city,
        address,
        postalCode,
        mobileNumber
    }: {
        cardNumber?: string;
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        mobileNumber?: string;
    }) {
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.nzCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.nzCardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.nzExpiryDateInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.nzCvvInput.fill(cvv);
        }
        if (firstName !== undefined && firstName !== null) {
            await this.nzFirstNameInput.fill(firstName);
        }
        if (lastName !== undefined && lastName !== null) {
            await this.nzLastNameInput.fill(lastName);
        }
        if (city !== undefined && city !== null) {
            await this.nzCityInput.fill(city);
        }
        if (address !== undefined && address !== null) {
            await this.nzAddressInput.fill(address);
        }
        if (postalCode !== undefined && postalCode !== null) {
            await this.nzPostalCodeInput.fill(postalCode);
        }
        if (mobileNumber !== undefined && mobileNumber !== null) {
            await this.nzMobileFormInput.fill(mobileNumber);
        }
    }


    
    get getDepModalError() : Locator {
        return this.depModalError;
    }

    get getPaysafeCardModal(): Locator {
        return this.paysafeCardModal;
    }
}