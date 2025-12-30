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
    private depositButton: Locator
    private depModalError: Locator
    private paysafeCardModal: Locator

    //AU credit card locators
    private auCreditCardNumberInput: Locator
    private auCardHolderNameInput: Locator
    private auExpiryDateInput: Locator
    private auCvvInput: Locator
    private firstNameInput: Locator
    private lastNameInput: Locator
    private dateOfBirthInput: Locator
    private stateSelect: Locator
    private cityInput: Locator
    private addressInput: Locator
    private postalCodeInput: Locator
    private mobileNumberInput: Locator

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

    private caCardNumberInput: Locator
    private caCardHolderNameInput: Locator
    private caExpiryDateInput: Locator
    private caCvvInput: Locator

    constructor(page: Page) {
        super(page);

        this.depModal = page.locator('.fast-deposit-modal')
        this.creditCardAU = page.locator("[data-method-id='devcode_devcode-creditcard-352_creditcard']")
        this.creditCardNZ = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-278_card-acquirer']")
        this.creditCardCA = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-380_card-acquirer']")
        this.creditCardDE = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-313_card-acquirer']")
        this.neoserf = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-neosurf~neosurf-175_neosurf~neosurf']")
        this.paysafecard = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-skrill~skrill-paysafecard-300_skrill~skrill-paysafecard']")
        this.interac = page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-interac~interac-316_interac~interac']")

        this.depositButton = page.locator('.payment-submit-default__button')
        this.depModalError = page.locator('#payment_common_error')
        this.paysafeCardModal = page.locator('.payments-lib-popup__content')

        //AU credit card locators
        this.auCreditCardNumberInput = page.locator('#encCreditcardNumber');
        this.auCardHolderNameInput = page.locator('#cardHolder');
        this.auExpiryDateInput = page.locator('#expiry_date');
        this.auCvvInput = page.locator('#encCvv');
        this.firstNameInput = page.locator('[name="first_name"]');
        this.lastNameInput = page.locator('#dynamic-form__last_name');
        this.dateOfBirthInput = page.locator('.Date--calendar__input');
        this.stateSelect = page.locator('.select__input');
        this.cityInput = page.locator('#dynamic-form__city');
        this.addressInput = page.locator('#dynamic-form__address');
        this.postalCodeInput = page.locator('#dynamic-form__postal_code');
        this.mobileNumberInput = page.locator('#dynamic-form__mobile_phone-number');
    

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

        //CA credit card specific locators
        this.caCardNumberInput = page.locator('#number');
        this.caCardHolderNameInput = page.locator('#holder');
        this.caExpiryDateInput = page.locator('#seamless_expiry_date');
        this.caCvvInput = page.locator('#cvv');

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
        await this.depositButton.scrollIntoViewIfNeeded();
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
        isNZ = false,
        isCA = false
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
        isCA?: boolean;
    }) {
        const region = isNZ ? 'NZ' : isCA ? 'CA' : 'AU';
        
        switch (region) {
            case 'NZ':
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
                break;
            
            case 'CA':
                await this.fillCACreditCardFieldsCA({
                    cardNumber,
                    cardHolderName,
                    expiryDate,
                    cvv
                });
                break;
            
            case 'AU':
            default:
                await this.fillAUCreditCardFieldsAU({
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
                break;
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

    async fillCACreditCardFieldsCA({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv
    }: {
        cardNumber?: string;
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
    }) {
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.caCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.caCardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.caExpiryDateInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.caCvvInput.fill(cvv);
        }
    }

    async fillAUCreditCardFieldsAU({
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
        dateOfBirth
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
        dateOfBirth?: string;
    }) { 
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.auCreditCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.auCardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.auExpiryDateInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.auCvvInput.fill(cvv);
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
            await this.mobileNumberInput.fill(mobileNumber);
        }
        if (dateOfBirth !== undefined && dateOfBirth !== null) {
            await this.dateOfBirthInput.fill(dateOfBirth);
        }
    }

    
    get getDepModalError() : Locator {
        return this.depModalError;
    }

    get getPaysafeCardModal(): Locator {
        return this.paysafeCardModal;
    }
}