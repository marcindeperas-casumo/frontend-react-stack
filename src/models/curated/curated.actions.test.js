import { types as cmsTypes } from "Models/cms";
import { getCuratedByMarketSlug, fetchCurated } from "Models/curated";
import defaultState from "Models/__mocks__/state.mock";

describe("Models/curated/actions", () => {
  describe("fetchCurated()", () => {
    test("should init an API fetch", async () => {
      const dispatch = jest.fn();
      const getState = () => defaultState;
      const slug = getCuratedByMarketSlug("gb_en");
      await fetchCurated()(dispatch, getState);

      expect(dispatch).toBeCalledWith({
        type: cmsTypes.FETCH_PAGE_BY_SLUG,
        slug,
      });
    });
  });
});
