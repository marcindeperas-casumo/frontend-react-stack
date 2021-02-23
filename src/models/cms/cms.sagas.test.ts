import { cloneableGenerator } from "redux-saga/utils";
import { types as schemaTypes } from "Models/schema";
import cmsApiMock from "Api/__mocks__/api.cms.mock";
import {
  initiateFetch,
  fetchPageBySlugSaga,
  getFetchCompleteTypeBySlug,
} from "Models/cms";

describe("Sagas/CMS", () => {
  describe("fetchPageBySlugSaga()", () => {
    const hash = "123";
    const lang = "en";
    const slugBasePath = "mobile";
    const slug = `${slugBasePath}.${cmsApiMock.slug}`;
    const action = { slug };
    const generator = cloneableGenerator(fetchPageBySlugSaga)(action);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
    const isGeneratorDone = (...args) => generator.next(...args).done;

    generator.next(); // delay
    generator.next();

    // This is going to be used in the tests which are focusing
    // on the generator code inside the "if (shouldFetch) { ... }" branch.
    const clonedGenerator = generator.clone();

    test("fetches CMS page by slug if not fetched yet", () => {
      const shouldFetch = true;
      const expectedAction = initiateFetch({ slug, hash, lang });

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '[true]' is not assignable to par... Remove this comment to see the full error message
      clonedGenerator.next(shouldFetch);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '["123"]' is not assignable to pa... Remove this comment to see the full error message
      clonedGenerator.next(hash);

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '["en"]' is not assignable to par... Remove this comment to see the full error message
      const fetchAction = clonedGenerator.next(lang).value.PUT.action;

      expect(fetchAction).toEqual(expectedAction);
    });

    test("waits until the fetch is completed", () => {
      const { pattern } = clonedGenerator.next().value.TAKE;

      expect(pattern).toBe(getFetchCompleteTypeBySlug(slug));
    });

    test("updates a single schema entity on a successful fetch", () => {
      const response = cmsApiMock;
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '[{ response: { id: string; slug:... Remove this comment to see the full error message
      const { action: currAction } = clonedGenerator.next({
        response,
      }).value.PUT;
      const expectedPayload = { ...cmsApiMock, slug }; // It should extend the slug with the base-path

      expect(currAction.type).toBe(schemaTypes.UPDATE_ENTITY);
      expect(currAction.payload).toBeDefined();
      expect(currAction.payload.cms[slug]).toEqual(expectedPayload);
    });

    test("does not fetch if page is already in the state", () => {
      const shouldFetch = false;

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '[false]' is not assignable to pa... Remove this comment to see the full error message
      generator.next(shouldFetch);

      expect(isGeneratorDone()).toBe(true);
    });
  });
});
