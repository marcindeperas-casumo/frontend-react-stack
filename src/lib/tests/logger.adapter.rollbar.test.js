import loggerAdapterConsole from "../logger.adapter.rollbar";

describe("Lib/LoggerAdapterRollbar", () => {
  test("provides the necessary log functions", () => {
    shouldBeFunction(loggerAdapterConsole.debug);
    shouldBeFunction(loggerAdapterConsole.info);
    shouldBeFunction(loggerAdapterConsole.warn);
    shouldBeFunction(loggerAdapterConsole.error);
  });
});

function shouldBeFunction(value) {
  expect(typeof value === "function").toBeTruthy();
}
