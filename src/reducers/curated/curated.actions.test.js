import { types as cmsTypes } from "Reducers/cms";
import { getCuratedByMarketSlug, fetchCurated } from "Reducers/curated";
import defaultState from "Reducers/__mocks__/state.mock";

describe("Reducers/curated/actions", () => {
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
