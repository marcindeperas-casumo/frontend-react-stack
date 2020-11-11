// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable fp/no-mutation */
// @flow
import { getDataLayerSnippet, getGTMScript } from "./GoogleTagManager.utils";

export const initialize = ({
  dataLayer,
  dataLayerName,
  containerId,
}: TSnippetParams) => {
  // Setup dataLayer object and wrap in script element
  const dataLayerScript = document.createElement("script");
  dataLayerScript.innerHTML = getDataLayerSnippet(dataLayer, dataLayerName);

  // Get main GTM script
  const script = document.createElement("script");
  script.innerHTML = getGTMScript(dataLayerName, containerId);

  // Add gtm script and datalayer loader script
  document.head.insertBefore(script, document.head.childNodes[0]);
  document.head.insertBefore(dataLayerScript, document.head.childNodes[0]);
};

export const pushToGTM = ({ dataLayerName, name, payload }: EventParams) => {
  // eslint-disable-next-line fp/no-mutating-methods
  window[dataLayerName].push({
    event: name,
    ...payload,
  });
};
