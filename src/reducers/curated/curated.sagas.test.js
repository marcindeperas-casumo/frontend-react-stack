import { cloneableGenerator } from "redux-saga/utils";
import { types as schemaTypes } from "Reducers/schema";
import curatedMock from "Reducers/curated/__mocks__/curated.page.api.json";
import { types, initFetch, fetchPageSaga } from "Reducers/curated";

describe("Reducers/curated/sagas", () => {
  describe("fetchPageSaga()", () => {
    const generator = fetchPageSaga();
    const isGeneratorDone = (...args) => generator.next(...args).done;

    generator.next();

    test("should fetch page if not fetched", () => {
      const shouldFetch = true;
      const expectedAction = initFetch();
      const fetchAction = generator.next(shouldFetch).value.PUT.action;

      expect(fetchAction).toEqual(expectedAction);
    });

    test("should wait until fetch completed", () => {
      const { pattern } = generator.next().value.TAKE;

      expect(pattern).toBe(types.CURATED_FETCH_PAGE_COMPLETE);
    });

    test("should update schema entities on success fetch", () => {
      const response = { curated: curatedMock };
      const { action } = generator.next({ response }).value.PUT;
      const expectedPayload = { ...curatedMock };

      expect(action.type).toBe(schemaTypes.UPDATE_ENTITY);
      expect(action.payload).toBeDefined();
      expect(action.payload.curated[types.CURATED_SLUG]).toEqual(
        expectedPayload
      );
    });

    test("should not fetch if already in state", () => {
      const shouldFetch = false;

      generator.next(shouldFetch);

      expect(isGeneratorDone()).toBe(true);
    });
  });
});
