import { prop, compose, defaultTo } from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { jackpotsMustDropUpdateSaga } from "./jackpotsMustDrop.saga.update";
import cometdResponseMock from "./__mocks__/jackpotsMustDrop.cometd.response.mock";

describe("Models/JackpotsMustDrop/UpdateSaga", () => {
  const currency = "GBP";
  const channel = `/jackpots/${currency}`;
  const data = cometdResponseMock;
  const generator = cloneableGenerator(jackpotsMustDropUpdateSaga)({
    channel,
    data,
  });

  // Yield selector
  generator.next();

  test("finishes execution if the channel is not for the current market", () => {
    const clonedGenerator = generator.clone();
    const currentMarketCurrency = "EUR";

    // Pass in currency
    const { done } = clonedGenerator.next(currentMarketCurrency);

    expect(done).toBe(true);
  });

  test("updates the jackpots if it is the current market", () => {
    const clonedGenerator = generator.clone();
    const currentMarketCurrency = currency;

    // Pass in currency and get updates
    const updateEffect = clonedGenerator.next(currentMarketCurrency);

    expect(getUpdateJackpotsFromEffect(updateEffect)).toBe(data);

    // Check if finishes after updating
    expect(clonedGenerator.next().done).toBe(true);
  });
});

function getUpdateJackpotsFromEffect(effect) {
  return compose(
    defaultTo({}),
    prop("jackpotMustDrop"),
    prop("payload"),
    prop("action"),
    prop("PUT"),
    prop("value")
  )(effect);
}
