import { take, select, call, put } from "redux-saga/effects";
import curatedMock from "Reducers/curated/__mocks__/curated.json";
import {
  CURATED_SLUG,
  fetchCurated,
  fetchCuratedGameSaga,
  curatedSelector,
  getGamesBySlug,
} from "Reducers/curated";
import { types as fetchTypes } from "Reducers/fetch"
import GameBrowserService from "Services/GameBrowserService";

describe("Reducers/curated/sagas", () => {
  describe("fetchCuratedGameSaga", () => {
    test("success flow game in store", () => {
      const generator = fetchCuratedGameSaga();
      const response = curatedMock;
      const { gameData, game } = response;
      generator.next({ response }).value;
      generator.next({ gameData, game }).value;

      expect(generator.next().done).toBe(true);
    });

    test("success flow fetch game not in store", () => {
      const generator = fetchCuratedGameSaga();
      const response = curatedMock;
      const gameData = null;
      const { game } = response;
      generator.next({ response }).value;
      generator.next({ gameData, game }).value;

      const args = {
        platform: "mobile",
        country: "gb",
        slugs: [response.game],
        variant: "default",
      };
      const { gamesBySlugs } = GameBrowserService;
      const { action } = generator.next(args.country).value.PUT;

      expect(action.type).toBe(fetchTypes.FETCH);
      expect(action.asyncCall).toBe(gamesBySlugs);
      expect(action.asyncCallData).toEqual(args);
    });
  });
});
