import { ENVS } from "Src/constants";
import { getLogger } from "./logger";

describe("Services/Logger", () => {
  const loggers = {
    a: "a",
    b: "b",
    [ENVS.DEVELOPMENT]: "logger-development",
  };

  test("selects the correct logger by env", () => {
    expect(getLogger("a", loggers)).toEqual("a");
    expect(getLogger("b", loggers)).toEqual("b");
  });

  test("returns the development logger if env is unknown", () => {
    expect(getLogger("unknown", loggers)).toEqual("logger-development");
  });
});
