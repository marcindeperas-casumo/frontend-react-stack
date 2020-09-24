// @flow
// This has been copied from 'common-frontend/src/js/payment/piqConstants.js'

export const PIQ_PAYMENT_TYPES = {
  // PIQ specific types that our backend maps to basic types (provider & psp service delimited by '/')
  CREDITCARD: "creditcard",
  NETELLER: "neteller",
  SKRILL: "skrill",
  BANK: "bank",
  BANK_LOCAL: "banklocal",
  BANK_IBAN: "bankiban",
  BANK_INTERNATIONAL: "bankintl",
  BANK_IBAN_INTERNATIONAL: "bankintiban",
  ZIMPLER: "zimpler" /* "Zimpler", not to be confused with "Bank by Zimpler" */,
  PAYSAFECARD: "paysafecard",
  BOKU: "boku",
  INSTADEBIT: "instadebit",
  IDEBIT: "idebit",
  ECOPAYZ: "ecopayz",
  PAYPAL: "paypal",
  EPRO_PAYMENTWALL: "epro/giftcard",
  SKRILL_QUICK_CHECKOUT:
    "skrillqco/rapidtransfer" /* RapidTranfer by SkrillQCO */,
  GIROPAY_BY_SKRILL: "skrillqco/giropay",
  SOFORT_BY_SKRILL: "skrillqco/sofort",
  SIIRTO: "siirto",
  APPLE_PAY: "applepay",
  CASH_TO_CODE: "funanga",
  MUCHBETTER: "muchbetter",
  SWISH: "swish",
  FONIX: "fonix",
  MOBILEPAY: "mobilepay",
  ECOBANQ: "ecobanq",
  ASTROPAY_CARD: "astropaycard",
  VENUSPOINT: "venuspoint",
  ZIMPLER_BANK:
    "zimpler" /* "Bank by Zimpler", not to be confused with "Zimpler" */,
  IWALLET: "iwallet",
  WEBREDIRECT: "webredirect",
  STICPAY: "sticpay",
  ENVOY_IDEAL: "envoy/ideal",
  ENVOY_SOFORT: "envoy/sofort",
  ENVOY_BANKTRANSFER: "envoy/banktransfer",
  ENVOY_PAYSAFECARD: "envoy/paysafecard",
  ENVOY_POLI: "envoy/poli",
  ENVOY_POLI_NZ: "envoy/polinz",
  ENVOY_GIROPAY: "envoy/giropay",
  APCO_GIROPAY: "apco/giropay",
  APCO_APG: "apco/apgdirect",
};

export const LOCAL_PAYMENT_TYPES = {
  CREDITCARD: "CREDITCARD",
  VISA_CARD: "VISA_CARD",
  MASTER_CARD: "MASTER_CARD",
  JCB_CARD: "JCB_CARD",
  MUCHBETTER_MASTERCARD: "MUCHBETTER_MASTERCARD",
  APG_CREDITCARD: "APG_CREDITCARD",
  NETELLER: "NETELLER",
  SKRILL: "MONEYBOOKERS",
  TRUSTLY: "TRUSTLY" /* Not used but needed for transaction history */,
  BANK_DEPOSIT: "BANK_DEPOSIT",
  BANK_WITHDRAW: "BANK_WITHDRAW",
  ZIMPLER:
    "PUGGLEPAY" /* "Zimpler" in CMS, not to be confused with "Bank by Zimpler" */,
  PAYSAFECARD: "PAYSAFECARD",
  EPRO: "EPRO" /*  Sub-provider: CryptoGO */,
  EPROPAYMENTWALL: "EPROPAYMENTWALL",
  IDEAL: "IDEAL",
  SOFORT: "SOFORT",
  GIROPAY: "GIROPAY",
  BOKU: "BOKU",
  INSTADEBIT: "INSTADEBIT",
  IDEBIT: "IDEBIT",
  ECOPAYZ: "ECOPAYZ",
  ENTROPAY: "ENTROPAY",
  PAYPAL: "PAYPAL",
  RAPIDTRANSFER_BY_SKRILL:
    "SKRILLQUICKCHECKOUT" /* RapidTranfer by SkrillQCO */,
  GIROPAY_BY_SKRILL: "GIROPAY_BY_SKRILLQCO",
  SOFORT_BY_SKRILL: "SOFORT_BY_SKRILLQCO",
  SIIRTO: "SIIRTO",
  APPLE_PAY: "APPLEPAY",
  TSI: "TSI",
  CASH_TO_CODE: "FUNANGACASHTOCODE",
  MUCHBETTER: "MUCHBETTER",
  INTERAC_E_TRANSFER: "INTERAC_E_TRANSFER",
  SWISH: "SWISH",
  FONIX: "FONIX",
  POLI: "POLI",
  MOBILEPAY: "MOBILEPAY",
  ECOBANQ: "ECOBANQ",
  ASTROPAY_CARD: "ASTROPAYCARD",
  VENUSPOINT: "VENUSPOINT",
  ZIMPLER_BANK:
    "ZIMPLERBANK" /* "Bank by Zimpler", not to be confused with "Zimpler" */,
  ZIMPLER_PHONE:
    "ZIMPLERPHONE" /* "Zimpler" in the backend, not to be confused with "Bank by Zimpler"*/,
  IWALLET: "IWALLET",
  STICPAY: "STICPAY",
};

export type localPaymentTypesValues = $Values<typeof LOCAL_PAYMENT_TYPES>;

export const TRANSACTION_ACTION_TYPE = {
  DEPOSIT: "deposit",
  QUICK_DEPOSIT: "quick-deposit",
  WITHDRAWAL: "withdrawal",
  CANCEL_WITHDRAWAL: "CANCEL_WITHDRAWAL",
};

export const CHANNEL = {
  MOBILE: "mobile",
  DESKTOP: "desktop",
  EPRO_DESKTOP: "epro-desktop",
};

export const PROVIDER = {
  INTERAC: "Interac",
};

export const TRANSACTION_STATUS_KEY = {
  txAmount: "receiptDepositTxAmount",
  pspRefId: "receiptDepositPspRefId",
  bankName: "receiptDepositBankName",
};

export const BIN_TYPES = {
  CREDIT: "CREDIT",
  DEBIT: "DEBIT",
  PREPAID: "PREPAID",
  UNKNOWN: "UNKNOWN",
};

export const TRANSACTION_DETAIL = {
  PROVIDER: "PAYMENTIQ_PROVIDER",
  PAYMENTIQ_TX_ID: "PAYMENTIQ_TX_ID",
  WITHDRAW_REJECTED_TIMESTAMP: "WITHDRAW_REJECTED_TIMESTAMP",
};

export const TRANSACTION_REASON = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
  REJECTED_WITHDRAW_PSP: "REJECTED_WITHDRAW_PSP",
  REJECTED_WITHDRAW_MANUALLY_BY_PLAYER: "REJECTED_WITHDRAW_MANUALLY_BY_PLAYER",
  REJECTED_WITHDRAW_MANUALLY_BY_OPERATOR:
    "REJECTED_WITHDRAW_MANUALLY_BY_OPERATOR",
};

export const TRANSACTION_STATE = {
  DONE: "DONE",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
  WAITING_INPUT: "WAITING_INPUT",
  PROCESSING: "PROCESSING",
  SUCCESSFUL: "SUCCESSFUL",
  FAILED: "FAILED",
};

export const TRANSACTION_SOURCE = {
  PAYMENT: "PAYMENT",
  ROLLBACK: "ROLLBACK",
  BACKOFFICE: "BACKOFFICE",
  BONUS_AWARDED: "BONUS_AWARDED",
  BONUS_FORFEITED: "BONUS_FORFEITED",
  BONUS_EXPIRED: "BONUS_EXPIRED",
  BONUS_CONVERTED: "BONUS_CONVERTED",
};

export const IFRAME_MESSAGE_ACTION = {
  INITIALIZE: "initialize",
  TOOLTIP: "tooltip",
  SUCCESS: "success",
  VALIDATION: "validation",
  CARD_TYPE: "card-type",
  CARD_IDENTIFIER: "card-identifier",
  PROCEED: "proceed",
  FOCUS: "focus",
  LABEL: "label",
  ERRORS: "errors",
  EXTRA_TEXT: "extra-text",
  EXTRA_RULE: "extra-rule",
};

export const IFRAME_TYPE_TO_CARD = {
  CREDITCARD: "CREDITCARD",
  VISA_CARD: "VISA_CARD",
  APG_VISA_CARD: "VISA_CARD",
  MASTER_CARD: "MASTER_CARD",
  JCB_CARD: "JCB_CARD",
  APG_CREDITCARD: "APG_CREDITCARD",
  APG_MASTER_CARD: "APG_MASTER_CARD",
  APG_JCB_CARD: "APG_JCB_CARD",
  ENTROPAY: "ENTROPAY",
  MUCHBETTER_MASTERCARD: "MUCHBETTER_MASTERCARD",
};

export const IFRAME_ERROR_CODE_TO_VOCA = {
  REQUIRED: "REQUIRED",
  TOO_SHORT: "TOO_SHORT",
  NOT_INTEGER: "NOT_INTEGER",
  NOT_CREDIT_CARD_NUMBER: "NOT_CREDIT_CARD_NUMBER",
  MASTERCARD_NOT_ALLOWED: "MASTERCARD_NOT_ALLOWED",
  VISA_CARD_NOT_ALLOWED: "VISA_CARD_NOT_ALLOWED",
  NOT_ENTROPAY_CARD_NUMBER: "NOT_ENTROPAY_CARD_NUMBER",
  NOT_MUCHBETTER_MASTERCARD_NUMBER: "NOT_MUCHBETTER_MASTERCARD_NUMBER",
};

export const IFRAME_TOOLTIP_EVENT = {
  SHOW_TOOLTIP: "show-tooltip",
  HIDE_TOOLTIP: "hide-tooltip",
};

export const IFRAME_EXTRA_RULE = {
  ENTROPAY_CARD: "entropay-only",
  TSI_ONLY_CARD: "tsi-only-card",
  MUCHBETTER_ONLY: "muchbetter-only",
  NO_MASTERCARD: "no-mastercard",
  NO_VISA: "no-visa",
  QUICK_DEPOSIT: "quick-deposit",
  APG_CARDS: "apg-cards",
  APG_CARDS_NO_VISA: "apg-no-visa",
};

export const IFRAME_PIQ_ENV = {
  LIVE: "live",
  TEST: "test",
};

export const IFRAME_MODE = {
  CARD_NUMBER: "cardNumber",
  CVV_CODE: "cvvCode",
};
