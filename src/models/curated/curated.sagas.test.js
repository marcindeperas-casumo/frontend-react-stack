import { put, take, call } from "redux-saga/effects";
import curatedMockAction from "Models/curated/__mocks__/curated.json";
import curatedMockGameData from "Models/curated/__mocks__/curated.game.json";
import { types, fetchCuratedGameSaga } from "Models/curated";
import { normalizeData, updateEntity } from "Models/schema";

describe("Models/curated/sagas", () => {
  describe("fetchCuratedGameSaga", () => {
    test("finishes if no page slug", () => {
      const generator = fetchCuratedGameSaga({
        type: "CMS/FETCH_PAGE_BY_SLUG_COMPLETE-curated.ramses-book-cc",
      });

      expect(generator.next().done).toBe(true);
    });

    test("success flow game in store", () => {
      const generator = fetchCuratedGameSaga(curatedMockAction);
      generator.next();
      generator.next({ gameData: curatedMockGameData });
      generator.next({ response: { foo: "bar" } });

      expect(generator.next().done).toBe(true);
    });

    test("success flow fetch game not in store", () => {
      const generator = fetchCuratedGameSaga(curatedMockAction);

      generator.next();
      generator.next({ gameData: null });
      generator.next({ response: { foo: "bar" } });

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
