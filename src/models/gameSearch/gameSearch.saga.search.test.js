import { cloneableGenerator } from "redux-saga/utils";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { select, put, take, call } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import {
  types,
  listTypes,
  fetchQuerySearch,
  gameSearchSaga,
  clearSearch,
  fetchLatestPlayedSaga,
  noResultsAction,
} from "Models/gameSearch";

describe("Models/GameSearch/Saga", () => {
  const country = "gb";
  const platform = "mobile";

  test("gameSearchSaga no query", () => {
    const action = { q: "" };
    const gen = gameSearchSaga(action);

    expect(gen.next().value).toEqual(select(countrySelector));

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchSaga", () => {
    const action = { q: "startburst" };
    const gen = cloneableGenerator(gameSearchSaga)(action);

    expect(gen.next().value).toEqual(select(countrySelector));

    expect(gen.next(country).value).toEqual(
      put(
        fetchQuerySearch({
          platform,
          country,
          q: action.q,
        })
      )
    );

    expect(gen.next().value).toEqual(take(types.GAME_SEARCH_FETCH_COMPLETE));

    // clone generator for noMatch scenario
    const noMatchGen = gen.clone();
    const response = { games: [] };

    expect(noMatchGen.next({ response }).value).toEqual(put(noResultsAction()));

    expect(noMatchGen.next().value).toEqual(call(fetchLatestPlayedSaga));
    expect(noMatchGen.next().done).toBe(true);

    // clone genrator for direct hit scenario
    const directHitGen = gen.clone();

    const responseHit = { games: ["foo"] };
    const gameListEntity = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: listTypes.GAME_SEARCH,
        games: responseHit.games,
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
  });
});
