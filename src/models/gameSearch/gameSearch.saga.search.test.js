import { cloneableGenerator } from "redux-saga/utils";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { select, put, take, call } from "redux-saga/effects";
import { sessionIdSelector } from "Models/handshake";
import {
  fetchQuerySearch,
  gameSearchSaga,
  clearSearch,
  fetchLatestPlayedSaga,
  getSearchFetchCompleteType,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/Saga", () => {
  test("gameSearchSaga no query", () => {
    const action = { query: "" };
    const gen = gameSearchSaga(action);

    expect(gen.next().value).toEqual(select(sessionIdSelector));

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchSaga query just spaces", () => {
    const action = { query: "    " };
    const gen = gameSearchSaga(action);

    expect(gen.next().value).toEqual(select(sessionIdSelector));

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchSaga", () => {
    const sessionId = "123";
    const action = { query: "startburst" };
    const gen = cloneableGenerator(gameSearchSaga)(action);

    expect(gen.next().value).toEqual(select(sessionIdSelector));

    expect(gen.next(sessionId).value).toEqual(
      put(
        fetchQuerySearch({
          sessionId,
          query: action.query,
        })
      )
    );

    const response = ["foo"];
    const entities = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: response,
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
    const responseHit = ["foo"];
    const gameListEntity = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: responseHit,
      },
    };

    expect(directHitGen.next({ response: responseHit }).value).toEqual(
      call(normalizeData, gameListEntity)
    );

    expect(directHitGen.next({ entities: gameListEntity }).value).toEqual(
      put(updateEntity(gameListEntity))
    );

    expect(directHitGen.next().value).toEqual(call(fetchLatestPlayedSaga));

    expect(directHitGen.next().done).toBe(true);

    // and no match scenarios
    const responseNoMatch = [];
    const gameListEntitiesNoMatch = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: responseNoMatch,
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
