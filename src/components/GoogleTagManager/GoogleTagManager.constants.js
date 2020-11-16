// @flow
import type { GTMDataLayer } from "./GoogleTagManager.types";

const CONTAINER_ID = "GTM-23P4";

// Retrieve 'PRODUCTION' config with overwrite capability
export const getProdConfig = (
  dataLayer: Object = {},
  dataLayerName: string = "dataLayer"
): GTMDataLayer => ({
  dataLayer,
  dataLayerName,
  containerId: CONTAINER_ID,
});
