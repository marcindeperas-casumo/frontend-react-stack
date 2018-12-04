import { prop, compose, defaultTo } from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { fetchJackpotsMustDropSaga } from "./jackpotsMustDrop.saga.fetch";
import cometdResponseMock from "./__mocks__/jackpotsMustDrop.cometd.response.mock";

describe("Models/JackpotsMustDrop/FetchSaga", () => {
  const generator = cloneableGenerator(fetchJackpotsMustDropSaga)();

  // Yield selector
  generator.next();

  test("finishes the generator if should not fetch anything", () => {
    const clonedGenerator = generator.clone();
    const shouldFetch = false;

    // Jump to the if block
    const { done } = clonedGenerator.next(shouldFetch);

    expect(done).toBe(true);
  });

  test("fires an action to update the jackpot entity", () => {
    const currency = "GBP";
    const response = cometdResponseMock;

    // Currency selector
    generator.next(currency);

    // Initiate fetch
    generator.next();

    // Take response
    generator.next();

    // Update entity
    const updateEffect = generator.next({ response });

    expect(getUpdateJackpotsFromEffect(updateEffect)).toEqual(response);
  });

  test("finishes after updating", () => {
    expect(generator.next().done).toBe(true);
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
