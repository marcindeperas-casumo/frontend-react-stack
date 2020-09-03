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
