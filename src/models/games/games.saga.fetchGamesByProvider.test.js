import { cloneableGenerator } from "redux-saga/utils";
import { call, put, take } from "redux-saga/effects";
import { requestError } from "Models/fetch";
import { waitForSelector } from "Utils/";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { fetchGamesByProviderSaga } from "./games.saga.fetchGamesByProvider";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { types } from "./games.constants";
import { initiateFetchGamesByProvider } from "./games.actions";

describe("Models/Games/Sagas", () => {
  describe("fetchGamesByProvider()", () => {
    const provider = "netent";
    const sessionId = "123";
    let generator;

    beforeEach(() => {
      generator = cloneableGenerator(fetchGamesByProviderSaga)({
        provider,
      });
    });

    test("should abort on when provider is empty", () => {
      expect(generator.next().value).toEqual(put(fetchGameProviders()));
      expect(generator.next().value).toEqual(
        call(waitForSelector, areGameProvidersLoaded)
      );
      const emptyProvider = {};
      generator.next();

      expect(generator.next(emptyProvider).value).toEqual(
        put(
          requestError(
            gameProviderTypes.GET_GAME_PROVIDER_ERROR,
            "Provider error"
          )
        )
      );
    });

    test("success path", () => {
      expect(generator.next().value).toEqual(put(fetchGameProviders()));
      expect(generator.next().value).toEqual(
        call(waitForSelector, areGameProvidersLoaded)
      );
      const providerData = { foo: "bar" };
      generator.next();
      generator.next(providerData);

      expect(generator.next(sessionId, provider).value).toEqual(
        put(
          initiateFetchGamesByProvider({
            sessionId,
            provider,
          })
        )
      );

      expect(generator.next().value).toEqual(
        take(types.FETCH_GAMES_BY_PROVIDER_COMPLETE)
      );

      const response = { foo: "response" };
      expect(generator.next({ response }).value).toEqual(
        call(normalizeData, {
          [ENTITY_KEYS.GAME_PROVIDER]: {
            slug: provider,
            games: response,
          },
        })
      );

      const entities = { someEntity: { id: 1 } };
      expect(generator.next({ entities }).value).toEqual(
        put(mergeEntity(entities))
      );
    });
  });
});
