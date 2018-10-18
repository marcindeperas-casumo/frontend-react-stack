import { types } from "Reducers/curatedCard";
import { actions as schemaActions } from "Reducers/schema";
import { normalizeData } from "Reducers/schema/schema";
import { call, put, take } from "redux-saga/effects";
import { fetchCuratedCardSaga } from "Sagas/curatedCard";

describe("fetchCuratedCardSaga", () => {
  test("success flow", () => {
    const generator = fetchCuratedCardSaga();

    generator.next();

    expect(generator.next().value).toEqual(take(types.FETCH_CURATED_COMPLETE));

    const response = { foo: "response" };
    expect(generator.next({ response }).value).toEqual(
      call(normalizeData, response)
    );

    const entities = { someEntity: { id: 1 } };
    expect(generator.next({ entities }).value).toEqual(
      put(schemaActions.updateEntity(entities))
    );
  });
});
