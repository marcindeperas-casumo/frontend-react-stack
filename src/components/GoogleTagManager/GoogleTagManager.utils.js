// @flow
import type { GTMDataLayer, GTMScriptParams } from "./GoogleTagManager.types";

export const getDataLayerSnippet = (
  dataLayer: $PropertyType<GTMDataLayer, "dataLayer">
) => {
  return `window.dataLayer = window.dataLayer || []; window.dataLayer.push(${JSON.stringify(
    dataLayer
  )})`;
};

export const getGTMScript = (
  containerId: $PropertyType<GTMScriptParams, "containerId">
) => {
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${containerId}');
  `;
};
