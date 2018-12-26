import { prop, defaultTo, compose } from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { fetchGamesBySlugsSaga } from "./games.saga.fetchGamesBySlugs";

describe("Models/Games/Sagas", () => {
  describe("fetchGamesBySlugsSaga()", () => {
    const slugs = ["foo", "bar"];
    const generator = cloneableGenerator(fetchGamesBySlugsSaga)({ slugs });

    // Yield the selector
    generator.next();

    test("calls the fetchGamesById with the correct parameters", () => {
      const country = "en";
      const fetchAction = getActionFromEffect(generator.next(country));
      const { asyncCallData } = fetchAction;

      expect(asyncCallData.country).toBe(country);
      expect(asyncCallData.slugs).toEqual(slugs);
      expect(asyncCallData.platform).toBe("mobile");
      expect(asyncCallData.variant).toBe("default");
    });

    test("normalizes the data", () => {
      const response = { foo: "bar" };

      // Yield the take()
      generator.next();

      // Yield the call()
      const effect = generator.next({ response });
      const call = getCallFromEffect(effect);

      expect(call.fn).toBeInstanceOf(Function);
      expect(call.args[0]).toEqual(response);
    });

    test("updates the game entities", () => {
      const entities = [{ id: "1" }, { id: "2" }];

      // Yield the updateEntities()
      const effect = generator.next({ entities });
      const updateAction = getActionFromEffect(effect);

      expect(updateAction.payload).toEqual(entities);
    });
  });
});

function getCallFromEffect(effect) {
  return compose(
    defaultTo({}),
    prop("CALL"),
    prop("value")
  )(effect);
}

function getActionFromEffect(effect) {
  return compose(
    defaultTo({}),
    prop("action"),
    prop("PUT"),
    prop("value")
  )(effect);
}
