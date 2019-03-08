import { cloneableGenerator } from "redux-saga/utils";
import { call, put, take } from "redux-saga/effects";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { fetchGameProvidersSaga } from "./gameProviders.saga.fetchGameProviders";
import { types } from "./gameProviders.constants";
import { initiateFetchGameProviders } from "./gameProviders.actions";

describe("Models/GameProviders/Sagas", () => {
  describe("fetchGameProvidersSaga()", () => {
    const generator = cloneableGenerator(fetchGameProvidersSaga)();

    test("success path", () => {
      expect(generator.next().value).toEqual(put(initiateFetchGameProviders()));

      expect(generator.next().value).toEqual(
        take(types.FETCH_GAME_PROVIDERS_COMPLETE)
      );

      const response = { foo: "response" };
      expect(generator.next({ response }).value).toEqual(
        call(normalizeData, { [`${ENTITY_KEYS.GAME_PROVIDER}s`]: response })
      );

      const entities = { someEntity: { id: 1 } };
      expect(generator.next({ entities }).value).toEqual(
        put(mergeEntity(entities))
      );
    });
  });
});
