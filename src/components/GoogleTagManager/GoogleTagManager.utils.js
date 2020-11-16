// @flow
import type { GTMDataLayer, GTMScriptParams } from "./GoogleTagManager.types";

export const getDataLayerSnippet = (
  dataLayer: $PropertyType<GTMDataLayer, "dataLayer">,
  dataLayerName: $PropertyType<GTMDataLayer, "dataLayerName"> = "dataLayer"
) => {
  return `window.${dataLayerName} = window.${dataLayerName} || []; window.${dataLayerName}.push(${JSON.stringify(
    dataLayer
  )})`;
};

export const getGTMScript = (
  dataLayerName: $PropertyType<GTMDataLayer, "dataLayerName">,
  containerId: $PropertyType<GTMScriptParams, "containerId">
) => {
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${containerId}');
  `;
};
