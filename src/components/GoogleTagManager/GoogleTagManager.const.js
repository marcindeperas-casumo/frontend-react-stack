// @flow
import type { GTMScriptParams } from "./GoogleTagManager.types";

const CONTAINER_ID = "GTM-23P4";

// Retrieve 'PRODUCTION' config with overwrite capability
export const getProdConfig = (
  dataLayer = {},
  dataLayerName = "dataLayer"
): GTMScriptParams => ({
  dataLayer,
  dataLayerName,
  containerId: CONTAINER_ID,
});
