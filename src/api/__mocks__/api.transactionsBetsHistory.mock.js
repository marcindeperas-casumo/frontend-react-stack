// @flow
export const walletTotals = [
  {
    currency: "GBP",
    awardedBonuses: { amount: 13, iso4217CurrencyCode: "GBP" },
    convertedBonuses: { amount: 45, iso4217CurrencyCode: "GBP" },
    withdrawals: { amount: 39, iso4217CurrencyCode: "GBP" },
    deposits: { amount: 72, iso4217CurrencyCode: "GBP" }
  }
];

export const gameroundTotals = [
  {
    betsAmount: 66,
    winningsAmount: 98.8,
  }
];

export const transactions = [
  {
    "id": "d324ac10-98d6-11e9-9751-0242ac110002",
    "walletId": "b8829410-7075-11e8-a5bf-0242ac11000c",
    "walletUpdateSource": "BONUS_AWARDED",
    "balanceBefore": {"amount":279.2855,"iso4217CurrencyCode":"GBP"},
    "delta": {"amount":10.0000,"iso4217CurrencyCode":"GBP"},
    "fee": null,
    "balanceAfter": {"amount":289.2855,"iso4217CurrencyCode":"GBP"},
    "paymentMethodId": null,
    "state": null,
    "withdrawalLocked": false,
    "reason": null,
    "details": null,
    "timestamp": 1561638404000,
    "sequenceNumber": 3692
  },
  {
    "id": "b75de3b6-c82e-4063-910b-ad05605b6b0d",
    "walletId": "b8829410-7075-11e8-a5bf-0242ac11000c",
    "walletUpdateSource": "PAYMENT",
    "balanceBefore": {"amount":259.2855,"iso4217CurrencyCode":"GBP"},
    "delta": {"amount":20.0000,"iso4217CurrencyCode":"GBP"},
    "fee": {"amount":0.0000,"iso4217CurrencyCode":"GBP"},
    "balanceAfter": {"amount":279.2855,"iso4217CurrencyCode":"GBP"},
    "paymentMethodId": "665f1b25-c98b-46c1-b937-5b49e9be1bc8",
    "state": "DONE",
    "withdrawalLocked": false,
    "reason": "DEPOSIT",
    "details": {
      "PAYMENTIQ_TX_TYPE_ID": "108",
      "PAYMENTIQ_TX_NAME": "CreditCardDeposit",
      "PAYMENTIQ_PROVIDER": "Realex",
      "AUTH_CODE": "b75de3b6-c82e-4063-910b-ad05605b6b0d",
      "PAYMENTIQ_TX_ID": "1170688"
    },
    "timestamp": 1559905056000,
    "sequenceNumber": 3691
  },
  {
    "id": "79147291-b58d-4228-80a7-6113d4203a4d",
    "walletId": "b8829410-7075-11e8-a5bf-0242ac11000c",
    "walletUpdateSource": "PAYMENT",
    "balanceBefore": {"amount":249.2855,"iso4217CurrencyCode":"GBP"},
    "delta": {"amount":10.0000,"iso4217CurrencyCode":"GBP"},
    "fee": {"amount":0.0000,"iso4217CurrencyCode":"GBP"},
    "balanceAfter": {"amount":259.2855,"iso4217CurrencyCode":"GBP"},
    "paymentMethodId": "665f1b25-c98b-46c1-b937-5b49e9be1bc8",
    "state": "DONE",
    "withdrawalLocked": false,
    "reason": "DEPOSIT",
    "details": {
      "PAYMENTIQ_TX_TYPE_ID": "108",
      "PAYMENTIQ_TX_NAME":
      "CreditCardDeposit",
      "PAYMENTIQ_PROVIDER": "Realex",
      "AUTH_CODE": "79147291-b58d-4228-80a7-6113d4203a4d",
      "PAYMENTIQ_TX_ID": "1155899"
    },
    "timestamp": 1559040664000,
    "sequenceNumber": 3689
  }
];