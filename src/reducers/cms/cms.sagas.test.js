import { cloneableGenerator } from "redux-saga/utils";
import { types as schemaTypes } from "Reducers/schema";
import cmsApiMock from "./__mocks__/cms.api.mock";
import { fetchPageBySlugSaga } from "./cms.sagas";
import { getFetchCompleteTypeBySlug } from "./cms.utils";
import { initiateFetch } from "./cms.actions";

describe("Sagas/CMS", () => {
  describe("fetchPageBySlugSaga()", () => {
    const hash = "123";
    const lang = "en";
    const slug = cmsApiMock.slug;
    const action = { slug };
    const generator = cloneableGenerator(fetchPageBySlugSaga)(action);
    const isGeneratorDone = (...args) => generator.next(...args).done;

    generator.next();
    generator.next();
    generator.next(hash);
    generator.next(lang);

    // This is going to be used in the tests which are focusing
    // on the generator code inside the "if (shouldFetch) { ... }" branch.
    const clonedGenerator = generator.clone();

    test("fetches CMS page by slug if not fetched yet", () => {
      const shouldFetch = true;
      const expectedAction = initiateFetch({ slug, hash, lang });
      const fetchAction = clonedGenerator.next(shouldFetch).value.PUT.action;

      expect(fetchAction).toEqual(expectedAction);
    });

    test("waits until the fetch is completed", () => {
      const { pattern } = clonedGenerator.next().value.TAKE;

      expect(pattern).toBe(getFetchCompleteTypeBySlug(slug));
    });

    test("updates schema entities on a successful fetch", () => {
      const response = { cms: cmsApiMock };
      const { action } = clonedGenerator.next({ response }).value.PUT;

      expect(action.type).toBe(schemaTypes.UPDATE_ENTITY);
      expect(action.payload).toBeDefined();
      expect(action.payload.cms[slug]).toEqual(cmsApiMock);
    });

    test("does not fetch if page is already in the state", () => {
      const shouldFetch = false;

      generator.next(shouldFetch);

      expect(isGeneratorDone()).toBe(true);
    });
  });
});
