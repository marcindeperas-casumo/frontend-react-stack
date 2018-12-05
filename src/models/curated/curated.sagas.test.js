import { put, take, call } from "redux-saga/effects";

import curatedMock from "Models/curated/__mocks__/curated.json";
import { types, fetchCuratedGameSaga } from "Models/curated";
import { types as fetchTypes } from "Models/fetch";
import { normalizeData, updateEntity } from "Models/schema";
import GameBrowserService from "Services/GameBrowserService";

describe("Models/curated/sagas", () => {
  describe("fetchCuratedGameSaga", () => {
    test("success flow game in store", () => {
      const generator = fetchCuratedGameSaga();
      const curated = curatedMock;
      const { gameData, game } = curated;

      generator.next({ curated });
      generator.next({ gameData, game });

      expect(generator.next().done).toBe(true);
    });

    test("success flow fetch game not in store", () => {
      const generator = fetchCuratedGameSaga();
      const curated = curatedMock;
      const gameData = null;
      const { game } = curated;

      generator.next({ curated });
      generator.next({ gameData, game });

      const args = {
        platform: "mobile",
        country: "gb",
        slugs: curated.game,
        variant: "default",
      };
      const { gamesBySlugs } = GameBrowserService;
      const { action } = generator.next(args.country).value.PUT;

      expect(action.type).toBe(fetchTypes.FETCH);
      expect(action.asyncCall).toBe(gamesBySlugs);
      expect(action.asyncCallData).toEqual(args);

      expect(generator.next().value).toEqual(
        take(types.CURATED_FETCH_GAME_COMPLETE)
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
});
