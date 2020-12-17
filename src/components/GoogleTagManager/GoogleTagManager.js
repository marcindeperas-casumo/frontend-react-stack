/* eslint-disable eslint-comments/disable-enable-pair */
// @flow
import logger from "Services/logger";
import { injectScript } from "Utils";
import { getDataLayerSnippet, getGTMScript } from "./GoogleTagManager.utils";
import type { GTMScriptParams, GTMEventParams } from "./GoogleTagManager.types";

export const initialize = ({
  dataLayer,
  containerId,
}: GTMScriptParams): Promise<*> => {
  // Setup dataLayer object and wrap in script element
  const dataLayerScript = getDataLayerSnippet(dataLayer);
  // Get main GTM script
  const gtmScript = getGTMScript(containerId);

  const initDataLayer = async () => {
    try {
      return await injectScript(dataLayerScript, "gtm-init-datalayer", true);
    } catch (e) {
      logger.error("[GTM] Error initializing DataLayer", e);
      return e;
    }
  };

  const injectGTM = async () => {
    try {
      return await injectScript(gtmScript, "google-tag-manger", true);
    } catch (e) {
      logger.error("[GTM] Error injecting script", e);
      return e;
    }
  };

  // Add Datalayer and GTM scripts
  return initDataLayer().then(() => injectGTM());
};

export const pushToGTM = ({ event, payload }: GTMEventParams) => {
  // eslint-disable-next-line fp/no-mutating-methods
  window.dataLayer.push({ event, ...payload });
};
