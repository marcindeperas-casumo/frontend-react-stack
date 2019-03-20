import { cloneableGenerator } from "redux-saga/utils";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { select, put, take, call } from "redux-saga/effects";
import { countrySelector } from "Models/handshake";
import {
  fetchQuerySearch,
  gameSearchSaga,
  clearSearch,
  fetchLatestPlayedSaga,
  getSearchFetchCompleteType,
  fetchSuggestedGamesSaga,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/Saga", () => {
  const country = "gb";
  const platform = "mobile";

  test("gameSearchSaga no query", () => {
    const action = { query: "" };
    const gen = gameSearchSaga(action);

    expect(gen.next().value).toEqual(select(countrySelector));

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchSaga query just spaces", () => {
    const action = { query: "    " };
    const gen = gameSearchSaga(action);

    expect(gen.next().value).toEqual(select(countrySelector));

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchSaga", () => {
    const action = { query: "startburst" };
    const gen = cloneableGenerator(gameSearchSaga)(action);

    expect(gen.next().value).toEqual(select(countrySelector));

    expect(gen.next(country).value).toEqual(
      put(
        fetchQuerySearch({
          platform,
          country,
          query: action.query,
        })
      )
    );

    const response = { games: ["foo"] };
    const entities = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: response.games,
      },
    };

    expect(gen.next().value).toEqual(
      take(getSearchFetchCompleteType(action.query))
    );

    // clone genrator at this point for direct hit scenario
    const directHitGen = gen.clone();
    // clone generator for noMatch scenario
    const noMatchGen = gen.clone();

    expect(gen.next({ response }).value).toEqual(call(normalizeData, entities));

    expect(gen.next({ entities }).value).toEqual(put(updateEntity(entities)));

    // direct hit
    const responseHit = { games: ["foo"] };
    const gameListEntity = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: responseHit.games,
      },
    };

    expect(directHitGen.next({ response: responseHit }).value).toEqual(
      call(normalizeData, gameListEntity)
    );

    expect(directHitGen.next({ entities: gameListEntity }).value).toEqual(
      put(updateEntity(gameListEntity))
    );

    expect(directHitGen.next().value).toEqual(
      call(fetchSuggestedGamesSaga, "foo")
    );

    expect(directHitGen.next().done).toBe(true);

    // and no match scenarios
    const responseNoMatch = { games: [] };
    const gameListEntitiesNoMatch = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: responseNoMatch.games,
      },
    };

    expect(noMatchGen.next({ response: responseNoMatch }).value).toEqual(
      call(normalizeData, gameListEntitiesNoMatch)
    );

    expect(
      noMatchGen.next({ entities: gameListEntitiesNoMatch }).value
    ).toEqual(put(updateEntity(gameListEntitiesNoMatch)));

    expect(noMatchGen.next().value).toEqual(call(fetchLatestPlayedSaga));

    expect(noMatchGen.next().done).toBe(true);
  });
});
