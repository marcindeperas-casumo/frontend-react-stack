import { call, put, select, take } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";
import { requestError } from "Models/fetch";
import { waitForSelector } from "Utils";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { initiateFetchGamesByProvider, types as gameTypes } from "Models/games";
import {
  fetchPlayerGamesCount,
  types as playerGamesTypes,
} from "Models/playerGames";
import { sessionIdSelector } from "Models/handshake";
import { fetchGamesByProviderSaga } from "./games.saga.fetchGamesByProvider";

describe("Models/Games/Sagas", () => {
  describe("fetchGamesByProvider()", () => {
    const provider = "netent";
    const page = 1;
    const pageSize = 50;
    const sessionId = 123;
    let generator;

    beforeEach(() => {
      generator = cloneableGenerator(fetchGamesByProviderSaga)({
        provider,
        page,
        pageSize,
      });
    });

    test("should abort when provider is empty", () => {
      const areProvidersLoaded = false;
      generator.next();
      expect(generator.next(areProvidersLoaded).value).toEqual(
        put(fetchGameProviders())
      );
      expect(generator.next().value).toEqual(
        call(waitForSelector, areGameProvidersLoaded)
      );
      const emptyProvider = {};
      generator.next();

      expect(generator.next(emptyProvider).value).toEqual(
        put(
          requestError(
            gameProviderTypes.GET_GAME_PROVIDER_ERROR,
            "Provider not found"
          )
        )
      );
      const { done } = generator.next();
      expect(done).toBe(true);
    });

    test("should fetch game count and should update store with game count and games", () => {
      const areProvidersLoaded = true;
      const gameCount = 0;
      const newGameCount = 5;
      generator.next();
      expect(generator.next(areProvidersLoaded).value).toEqual(
        select(sessionIdSelector)
      );
      expect(generator.next(sessionId).value).toEqual(
        put(
          initiateFetchGamesByProvider({ provider, sessionId, page, pageSize })
        )
      );
      expect(generator.next().value).toEqual(
        take(gameTypes.FETCH_GAMES_BY_PROVIDER_COMPLETE)
      );
      generator.next({ response: ["foo"] });
      generator.next(["bar"]);
      expect(generator.next(gameCount).value).toEqual(
        put(fetchPlayerGamesCount({ provider, sessionId }))
      );
      expect(generator.next().value).toEqual(
        take(playerGamesTypes.PLAYER_GAMES_FETCH_COUNT_COMPLETE)
      );
      expect(generator.next({ response: newGameCount }).value).toEqual(
        call(normalizeData, {
          [ENTITY_KEYS.GAME_PROVIDER]: {
            slug: provider,
            gameCount: newGameCount,
            games: ["bar", "foo"],
          },
        })
      );
      const entities = ["foo", "bar"];
      expect(generator.next({ entities }).value).toEqual(
        put(mergeEntity(entities))
      );
    });

    test("shouldn't fetch game count but should update store with new games", () => {
      const areProvidersLoaded = true;
      const gameCount = 5;
      generator.next();
      expect(generator.next(areProvidersLoaded).value).toEqual(
        select(sessionIdSelector)
      );
      expect(generator.next(sessionId).value).toEqual(
        put(
          initiateFetchGamesByProvider({ provider, sessionId, page, pageSize })
        )
      );
      expect(generator.next().value).toEqual(
        take(gameTypes.FETCH_GAMES_BY_PROVIDER_COMPLETE)
      );
      generator.next({ response: ["foo"] });
      generator.next(["bar"]);
      expect(generator.next(gameCount).value).toEqual(
        call(normalizeData, {
          [ENTITY_KEYS.GAME_PROVIDER]: {
            slug: provider,
            gameCount: gameCount,
            games: ["bar", "foo"],
          },
        })
      );
      const entities = ["foo", "bar"];
      expect(generator.next({ entities }).value).toEqual(
        put(mergeEntity(entities))
      );
    });
  });
});
