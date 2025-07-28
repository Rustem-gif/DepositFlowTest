// Test data generated from qase.io JSON export
// Based on CUR-2025-07-26 (2).json - Deposit Flow test cases

export interface UserCredentials {
  email: string;
  password: string;
}

export interface CreditCardData {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
  firstName: string;
  lastName: string;
  dob: string;
  city: string;
  postalCode: string;
  mobileNumber: string;
  state?: string; // Optional, not all countries have states
}

export interface PaymentMethods {
  creditCard: CreditCardData;
  // Additional payment methods with their specific requirements
  neoserf?: { minAmount: number };
  paysafecard?: { accountId: string };
  interac?: { email: string };
  noda?: { email: string };
  bankTransfer?: { minAmount: number };
}

export interface CountryTestData {
  vpnLocation: string;
  credentials: UserCredentials; // To be filled later
  paymentMethods: PaymentMethods;
}

// Main test data structure based on JSON export
export const testData: Record<string, CountryTestData> = {
  AU: {
    vpnLocation: 'Australia - Melbourne',
    credentials: {
      email: '', // To be provided later
      password: '' // To be provided later
    },
    paymentMethods: {
      creditCard: {
        cardNumber: '4242 4242 4242 4242',
        nameOnCard: 'Frodo Bagins',
        expiryDate: '11/29',
        cvv: '111',
        firstName: 'Frodo',
        lastName: 'Bagins',
        dob: '11/11/1990',
        state: 'Australian Capital Territory',
        city: 'Blackwood',
        postalCode: '2345',
        mobileNumber: '+61 430 055 447'
      },
      neoserf: {
        minAmount: 25
      }
    }
  },

  NZ: {
    vpnLocation: 'New Zealand - Auckland',
    credentials: {
      email: '', // To be provided later
      password: '' // To be provided later
    },
    paymentMethods: {
      creditCard: {
        cardNumber: '4242 4242 4242 4242',
        nameOnCard: 'Frodo Bagins',
        expiryDate: '11/29',
        cvv: '111',
        firstName: 'Frodo',
        lastName: 'Bagins',
        dob: '11/11/1990',
        city: 'Blackwood',
        postalCode: '7843',
        mobileNumber: '+64 21 123 4567'
      },
      paysafecard: {
        accountId: 'test-paysafe-123'
      }
    }
  },

  CA: {
    vpnLocation: 'Canada - Montreal',
    credentials: {
      email: '', // To be provided later
      password: '' // To be provided later
    },
    paymentMethods: {
      creditCard: {
        cardNumber: '4242 4242 4242 4242',
        nameOnCard: 'Frodo Bagins',
        expiryDate: '11/29',
        cvv: '111',
        firstName: 'Frodo',
        lastName: 'Bagins',
        dob: '11/11/1990',
        state: 'New Brunswick',
        city: 'Blackwood',
        postalCode: 'K0G 0A0',
        mobileNumber: '+1 416 555 0123'
      },
      interac: {
        email: 'test.interac@example.com'
      }
    }
  },

  DE: {
    vpnLocation: 'Germany - Frankfurt - 1',
    credentials: {
      email: '', // To be provided later
      password: '' // To be provided later
    },
    paymentMethods: {
      creditCard: {
        cardNumber: '4242 4242 4242 4242',
        nameOnCard: 'Frodo Baggins',
        expiryDate: '11/29',
        cvv: '111',
        firstName: 'Frodo',
        lastName: 'Bagins',
        dob: '11/11/1990',
        city: 'Berlin',
        postalCode: '10176',
        mobileNumber: '+49 157 11345678'
      },
      noda: {
        email: 'test.noda@example.com'
      },
      bankTransfer: {
        minAmount: 20
      }
    }
  }
};

// Helper function to get credit card data for a country
export function getCreditCardData(country: keyof typeof testData): CreditCardData {
  return testData[country].paymentMethods.creditCard;
}

// Helper function to get all payment methods for a country
export function getPaymentMethods(country: keyof typeof testData): PaymentMethods {
  return testData[country].paymentMethods;
}

// Helper function to get specific payment method data
export function getPaymentMethodData<T extends keyof PaymentMethods>(
  country: keyof typeof testData, 
  method: T
): PaymentMethods[T] {
  return testData[country].paymentMethods[method];
}

// Helper function to get VPN location for a country
export function getVpnLocation(country: keyof typeof testData): string {
  return testData[country].vpnLocation;
}

// Helper function to get user credentials for a country
export function getUserCredentials(country: keyof typeof testData): UserCredentials {
  return testData[country].credentials;
}

// Helper function to update user credentials for a country
export function setUserCredentials(country: keyof typeof testData, email: string, password: string): void {
  testData[country].credentials.email = email;
  testData[country].credentials.password = password;
}

// Export available countries
export const COUNTRIES = Object.keys(testData) as Array<keyof typeof testData>;

// Payment methods available by country (based on JSON test cases)
export const PAYMENT_METHODS_BY_COUNTRY = {
  AU: ['creditCard', 'neoserf'] as const,
  NZ: ['creditCard', 'paysafecard'] as const,
  CA: ['creditCard', 'interac'] as const,
  DE: ['creditCard', 'noda', 'bankTransfer'] as const
} as const;

// Helper function to check if a payment method is available for a country
export function isPaymentMethodAvailable(country: keyof typeof testData, method: string): boolean {
  return PAYMENT_METHODS_BY_COUNTRY[country].includes(method as any);
}