import {
  fetchGamesHandshake,
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
} from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import { call, put, select, take } from "redux-saga/effects";
import { waitForSelector } from "Utils/saga.utils";
import { fetchGameListSaga } from "./games.saga.fetchGameList";
import { fetchTopLists } from "./games.actions";
import { types } from "./games.constants";

describe("Models/Games/Sagas", () => {
  describe("fetchGameListSaga()", () => {
    test("success flow", () => {
      const generator = fetchGameListSaga();

      const platform = "mobile";
      const country = "mt";
      const currency = "EUR";
      const market = "ROW";
      const playerId = "playerId-1";
      const handshake = { foo: "bar" };
      const areGamesFetched = false;

      generator.next();
      generator.next(country);
      generator.next(currency);
      generator.next(market);
      generator.next(playerId);

      expect(generator.next(areGamesFetched).value).toEqual(
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

    test("does not fetch anything if game list is already being fetched", () => {
      const generator = fetchGameListSaga();
      const country = "mt";
      const currency = "EUR";
      const market = "ROW";
      const playerId = "playerId-1";
      const areGamesFetched = true;

      generator.next();
      generator.next(country);
      generator.next(currency);
      generator.next(market);
      generator.next(playerId);

      const lastYieldedValue = generator.next(areGamesFetched);

      expect(lastYieldedValue.done).toBe(true);
    });
  });
});
