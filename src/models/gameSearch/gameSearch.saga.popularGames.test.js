import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { select, put, take, call } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import {
  types,
  fetchMostPopularGames,
  fetchPopularGamesSaga,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/Saga", () => {
  test("fetchPopularGamesSaga", () => {
    const gen = fetchPopularGamesSaga();

    const platform = "mobile";
    const country = "gb";
    const id = GAME_LIST_IDS.POPULAR_GAMES;
    const pageSize = 50;

    expect(gen.next().value).toEqual(select(countrySelector));

    expect(gen.next(country).value).toEqual(
      put(fetchMostPopularGames({ platform, country, id, pageSize }))
    );

    expect(gen.next().value).toEqual(
      take(types.GAME_SEARCH_FETCH_MOSTPOPULAR_COMPLETE)
    );

    const response = { games: ["foo"] };
    const gameList = { id, games: response.games };
    const entities = {
      [ENTITY_KEYS.GAME_LIST]: gameList,
    };

    expect(gen.next({ response }).value).toEqual(call(normalizeData, entities));

    expect(gen.next({ entities }).value).toEqual(put(updateEntity(entities)));

    expect(gen.next().done).toBe(true);
  });
});
