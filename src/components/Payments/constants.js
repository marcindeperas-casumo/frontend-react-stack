//@todo: change to corresponding piq iframe when ready, testing only
export const piqIframeUrlBase =
  "https://hostedpages.paymentiq.io/casumo/mobile-piq-iframe-responsive.html";

export const composeIframeUrl = ({
  urlBase,
  env,
  mode,
  luhnCheck = true,
  id,
}) => {
  return `${urlBase}?${env}#${mode}_${luhnCheck ? "" : "noLuhnCheck_"}${id}`;
};
