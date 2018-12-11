import { T, F } from "ramda";
import { ENVS } from "Src/constants";
import { getLogger } from "./logger";

describe("Services/Logger", () => {
  const loggers = {
    [ENVS.PRODUCTION]: "logger-production",
    [ENVS.DEVELOPMENT]: "logger-development",
    [ENVS.TEST]: "logger-test",
  };

  test("returns the production logger in production mode", async () => {
    const logger = getLogger(ENVS.PRODUCTION, loggers);

    expect(logger).toEqual("logger-production");
  });

  test("returns the development logger in dev mode", async () => {
    const logger = getLogger(ENVS.DEVELOPMENT, loggers);

    expect(logger).toEqual("logger-development");
  });

  test("returns the test logger in test mode", async () => {
    const logger = getLogger(ENVS.TEST, loggers);

    expect(logger).toEqual("logger-test");
  });

  test("returns the development logger if env is unknown", async () => {
    const logger = getLogger("UNKNOWN-ENV", loggers);

    expect(logger).toEqual("logger-development");
  });
});
