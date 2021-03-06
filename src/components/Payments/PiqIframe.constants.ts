export const piqIframeUrlBase =
  "https://hostedpages.paymentiq.io/casumo/react-piq-iframe-responsive.html";

export const composeIframeUrl = ({
  urlBase,
  env,
  mode,
  luhnCheck = true,
  id,
}) => {
  return `${urlBase}?${env}#${mode}_${luhnCheck ? "" : "noLuhnCheck_"}${id}`;
};
