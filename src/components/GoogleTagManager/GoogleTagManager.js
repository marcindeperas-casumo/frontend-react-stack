/* eslint-disable eslint-comments/disable-enable-pair */
// @flow
import { getDataLayerSnippet, getGTMScript } from "./GoogleTagManager.utils";
import type { GTMScriptParams, GTMEventParams } from "./GoogleTagManager.types";

export const initialize = ({
  dataLayer,
  dataLayerName,
  containerId,
}: GTMScriptParams) => {
  // Setup dataLayer object and wrap in script element
  const dataLayerScript = document.createElement("script");
  // eslint-disable-next-line fp/no-mutation
  dataLayerScript.innerHTML = getDataLayerSnippet(dataLayer, dataLayerName);

  // Get main GTM script
  const script = document.createElement("script");
  // eslint-disable-next-line fp/no-mutation
  script.innerHTML = getGTMScript(dataLayerName, containerId);

  if (document.head) {
    // Add gtm script and datalayer loader script
    document.head.insertBefore(script, document.head?.childNodes[0]);
    document.head.insertBefore(dataLayerScript, document.head?.childNodes[0]);
  }
};

export const pushToGTM = ({
  event,
  dataLayerName,
  payload,
}: GTMEventParams) => {
  const data = Object.assign({ event: event }, payload);
  // eslint-disable-next-line fp/no-mutating-methods
  window[dataLayerName].push(data);
};
