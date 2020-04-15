import { ENVIRONMENTS } from "Src/constants";

export const NETENT_SCRIPT_URL = {
  [ENVIRONMENTS.TEST]:
    "https://casumo-static-test.casinomodule.com/gameinclusion/library/gameinclusion.js",
  [ENVIRONMENTS.PRODUCTION]:
    "https://casumo-static.casinomodule.com/gameinclusion/library/gameinclusion.js",
};

export const getUrlForEnv = env => NETENT_SCRIPT_URL[env];
