import { getEnv } from "Utils";
import { ENVS } from "Src/constants";
import loggerNull from "Lib/logger.adapter.null";
import loggerConsole from "Lib/logger.adapter.console";
import loggerRollbar from "Lib/logger.adapter.rollbar";

export function getLogger(env, loggers) {
  return loggers[env] || loggers[ENVS.DEVELOPMENT];
}

export default getLogger(getEnv(), {
  [ENVS.DEVELOPMENT]: loggerConsole,
  [ENVS.PRODUCTION]: loggerRollbar,
  [ENVS.TEST]: loggerNull,
});
