import { take, select, call, put } from "redux-saga/effects";
import curatedMock from "Reducers/curated/__mocks__/curated.json";
import {
  CURATED_SLUG,
  fetchCurated,
  fetchCuratedSaga,
  curatedSelector,
  getGamesBySlug,
} from "Reducers/curated";

describe("Reducers/curated/sagas", () => {
  describe("fetchCuratedSaga", () => {
    test("success flow", () => {
      const generator = fetchCuratedSaga();

      generator.next();
      const { game } = curatedMock;
      generator.next({ game });
      generator.next();
      generator.next();

      const platform = "mobile";
      const country = "gb";
      const slugs = game;
      const variant = "default";
      const args = { platform, country, slugs, variant };

      const received = JSON.stringify(generator.next(args).value);
      const expected = JSON.stringify(call(getGamesBySlug, args));
      expect(received).toEqual(expected);
    });
  });
});
