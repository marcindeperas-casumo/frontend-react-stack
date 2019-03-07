import { cloneableGenerator } from "redux-saga/utils";
import { call, put, take } from "redux-saga/effects";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { fetchGamesByProviderSaga } from "./games.saga.fetchGamesByProvider";
import {
  getGameProvider,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { types } from "./games.constants";
import { initiateFetchGamesByProvider } from "./games.actions";

describe("Models/Games/Sagas", () => {
  describe("fetchGamesByProvider()", () => {
    const provider = "netent";
    const sessionId = "123";
    const generator = cloneableGenerator(fetchGamesByProviderSaga)({
      provider,
    });

    test("success path", () => {
      expect(generator.next().value).toEqual(put(getGameProvider(provider)));
      expect(generator.next().value).toEqual(
        take(gameProviderTypes.GET_GAME_PROVIDER_SUCCESS)
      );
      //Yield the selector
      generator.next();

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
