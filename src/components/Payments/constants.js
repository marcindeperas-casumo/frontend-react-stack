//@todo: change to corresponding piq iframe when ready, testing only
export const piqIframeUrlBase =
  "https://hostedpages.paymentiq.io/casumo/mobile-piq-iframe-responsive.html";

export const MESSAGE_ACTION = {
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

export const TYPE_TO_CARD = {
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

export const composeIframeUrl = ({
  urlBase,
  env,
  mode,
  luhnCheck = true,
  id,
}) => {
  return `${urlBase}?${env}#${mode}_${luhnCheck ? "" : "noLuhnCheck_"}${id}`;
};

export const IFRAME_MODE = {
  CARD_NUMBER: "cardNumber",
  CVV_CODE: "cvvCode",
};

export const ENV = {
  LIVE: "live",
  TEST: "test",
};
