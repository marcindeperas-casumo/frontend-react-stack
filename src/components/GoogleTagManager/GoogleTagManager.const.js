// @flow
import type { GTMScriptParams } from "./GoogleTagManager.types";

const CONTAINER_ID = "GTM-23P4";

// Retrieve 'PRODUCTION' config with overwrite capability
export const getProdConfig = (
  dataLayer = {},
  dataLayerName = "dataLayer"
): GTMScriptParams => ({
  containerId: CONTAINER_ID,
  dataLayerName,
  dataLayer,
});
