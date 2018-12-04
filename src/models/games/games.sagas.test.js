import {
  fetchGamesHandshake,
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
} from "Models/handshake";
import { prop, defaultTo, compose } from "ramda";
import { normalizeData, updateEntity } from "Models/schema";
import { cloneableGenerator } from "redux-saga/utils";
import { call, put, select, take } from "redux-saga/effects";
import { waitForSelector } from "Sagas/utils";
import { launchGame } from "Services/LaunchGameService";
import {
  fetchGameListSaga,
  launchGameSaga,
  fetchGamesBySlugsSaga,
} from "./games.sagas";
import { fetchTopLists } from "./games.actions";
import { types } from "./games.constants";

describe("Models/Games/Sagas", () => {
  describe("launchGameSaga()", () => {
    test("calling launchGame service", () => {
      const slug = "foo-slug";
      const generator = launchGameSaga({
        slug,
      });

      expect(generator.next().value).toEqual(call(launchGame, { slug }));
    });
  });

  describe("fetchGameListSaga()", () => {
    test("success flow", () => {
      const generator = fetchGameListSaga();

      const platform = "mobile";
      const country = "mt";
      const currency = "EUR";
      const market = "ROW";
      const playerId = "playerId-1";
      const handshake = { foo: "bar" };

      generator.next();
      generator.next(country);
      generator.next(currency);
      generator.next(market);

      expect(generator.next(playerId).value).toEqual(
        put(fetchGamesHandshake({ country }))
      );

      expect(generator.next().value).toEqual(
        call(waitForSelector, isGamesHandshakeLoaded)
      );

      expect(generator.next().value).toEqual(select(gamesHandshakeSelector));
      expect(generator.next(handshake).value).toEqual(
        put(
          fetchTopLists({
            handshake,
            country,
            platform,
            currency,
            market,
            playerId,
          })
        )
      );

      expect(generator.next().value).toEqual(
        take(types.FETCH_TOP_LISTS_COMPLETE)
      );

      const response = { foo: "response" };
      expect(generator.next({ response }).value).toEqual(
        call(normalizeData, response)
      );

      const entities = { someEntity: { id: 1 } };
      expect(generator.next({ entities }).value).toEqual(
        put(updateEntity(entities))
      );
    });
  });

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
