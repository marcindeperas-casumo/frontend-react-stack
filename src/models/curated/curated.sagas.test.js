import { put, take, call } from "redux-saga/effects";

import curatedMock from "Models/curated/__mocks__/curated.json";
import { types, fetchCuratedGameSaga } from "Models/curated";
import { normalizeData, updateEntity } from "Models/schema";

describe("Models/curated/sagas", () => {
  describe("fetchCuratedGameSaga", () => {
    test("success flow game in store", () => {
      const type = "CMS/FETCH_PAGE_BY_SLUG_COMPLETE-curated.sakura-fortune";
      const generator = fetchCuratedGameSaga({ type });
      const curated = curatedMock;
      const { gameData, game } = curated;

      generator.next({ curated });
      generator.next({ gameData, game });

      expect(generator.next().done).toBe(true);
    });

    test("success flow fetch game not in store", () => {
      const type = "CMS/FETCH_PAGE_BY_SLUG_COMPLETE-curated.sakura-fortune";
      const generator = fetchCuratedGameSaga({ type });
      const curated = curatedMock;
      const gameData = null;
      const { game } = curated;
      const country = "gb";

      generator.next({ curated });
      generator.next({ gameData, game });
      generator.next(country);

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
