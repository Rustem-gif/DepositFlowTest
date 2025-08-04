export const testData = {
      AU: {
        vpnLocation: 'Australia - Melbourne',
        credentials: {
          email: 'AU_dep@kingbilly.xyz',
          password: '1qaz2wsx'
        },
        paymentMethods: {
          creditCard: {
            cardNumber: '4242 4242 4242 4242',
            nameOnCard: 'Frodo Bagins',
            expiryDate: '11/29',
            cvv: '111',
            firstName: 'Frodo',
            lastName: 'Bagins',
            dob: '1990-11-11',
            address: '123 Main St',
            state: 'Australian Capital Territory',
            city: 'Blackwood',
            postalCode: '2345',
            mobileNumber: '430 055 447'
          },
          neoserf: {
            minAmount: 25
          }
        }
      },

      NZ: {
        vpnLocation: 'New Zealand',
        credentials: {
          email: 'NZ_dep@kingbilly.xyz',
          password: '1qaz2wsx'
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
            address: '123 Main St',
            postalCode: '7843',
            mobileNumber: '21 123 4567'
          },
          paysafecard: {
            accountId: 'test-paysafe-123'
          }
        }
      },

      CA: {
        vpnLocation: 'Canada - Montreal',
        credentials: {
          email: 'CA_dep@kingbilly.xyz',
          password: '1qaz2wsx'
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
            mobileNumber: '416 555 0123'
          },
          interac: {
            email: 'test.interac@example.com'
          }
        }
      },

      DE: {
        vpnLocation: 'Germany - Frankfurt - 1',
        credentials: {
          email: 'DE_depp@kingbilly.xyz',
          password: '1qaz2wsx'
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
            mobileNumber: '157 11345678'
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
  