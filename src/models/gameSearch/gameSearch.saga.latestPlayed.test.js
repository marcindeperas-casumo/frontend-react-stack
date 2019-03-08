import { cloneableGenerator } from "redux-saga/utils";
import { select, put, take, call } from "redux-saga/effects";
import {
  ENTITY_KEYS,
  normalizeData,
  updateEntity,
  gameListSelector,
} from "Models/schema";
import {
  country as countrySelector,
  playerId as playerIdSelector,
} from "Models/handshake";
import {
  types,
  fetchLatestPlayedGames,
  fetchLatestPlayedSaga,
  fetchPopularGamesSaga,
  fetchGamesByProviderGameNames,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/fetchLatestPlayedSaga", () => {
  const gen = cloneableGenerator(fetchLatestPlayedSaga)();

  const platform = "mobile";
  const variant = "default";
  const country = "mt";
  const playerId = "playerId-1";

  gen.next();
  gen.next(country);
  gen.next(playerId);

  const latestPlayedListGen = gen.clone();

  test("has latest played games in store, stop saga", () => {
    expect(latestPlayedListGen.next({ games: ["starburst"] }).done).toBe(true);
  });

  test("does not have latest played games in store, continue saga", () => {
    expect(gen.next({ games: [] }).value).toEqual(
      put(fetchLatestPlayedGames({ playerId }))
    );

    expect(gen.next().value).toEqual(
      take(types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE)
    );
  });

  test("has no latest played games call fetchPopularGamesSaga", () => {
    const noLatestPlayedGen = gen.clone();

    expect(noLatestPlayedGen.next({ response: [] }).value).toEqual(
      call(fetchPopularGamesSaga)
    );

    expect(noLatestPlayedGen.next().done).toBe(true);
  });

  test("has latest played games from api", () => {
    const response = [{ gameName: "foo" }];
    const providerGameNames = ["foo"];

    expect(gen.next({ response }).value).toEqual(
      put(
        fetchGamesByProviderGameNames({
          platform,
          country,
          variant,
          providerGameNames,
        })
      )
    );

    expect(gen.next().value).toEqual(
      take(types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE)
    );

    const result = { games: [{ id: "foo" }] };

    expect(gen.next({ response: result }).value).toEqual(
      call(normalizeData, result)
    );

    const entities = { id: 1 };

    expect(gen.next({ entities, result }).value).toEqual(
      put(updateEntity(entities))
    );

    const gameListEntity = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.LATEST_PLAYED,
        games: result.games,
      },
    };

    expect(gen.next().value).toEqual(call(normalizeData, gameListEntity));

    expect(gen.next({ entities: gameListEntity }).value).toEqual(
      put(updateEntity(gameListEntity))
    );

    expect(gen.next().done).toBe(true);
  });
});
