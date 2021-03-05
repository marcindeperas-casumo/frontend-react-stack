import type { GTMScriptParams } from "./GoogleTagManager.types";

const CONTAINER_ID = "GTM-23P4";

// Retrieve 'PRODUCTION' config with optionally passed initial datalayer
export const getProdConfig = (dataLayer?: Object): GTMScriptParams => ({
  dataLayer,
  containerId: CONTAINER_ID,
});
