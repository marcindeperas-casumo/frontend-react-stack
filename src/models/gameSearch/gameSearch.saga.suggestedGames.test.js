import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { select, put, take, call } from "redux-saga/effects";
import {
  countrySelector,
  fetchGamesHandshake,
  isGamesHandshakeLoaded,
  gamesHandshakeSelector,
} from "Models/handshake";
import {
  types,
  fetchSuggestedGamesAction,
  fetchSuggestedGamesSaga,
} from "Models/gameSearch";
import { waitForSelector } from "Utils";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/Saga", () => {
  test("fetchSuggestedGamesSaga", () => {
    const game = "starburst";
    const gen = fetchSuggestedGamesSaga(game);

    const platform = "mobile";
    const id = GAME_LIST_IDS.SUGGESTED_GAMES;
    const areGamesFetched = false;
    const variant = "default";
    const handshake = { foo: "bar" };

    gen.next();
    gen.next(countrySelector);

    expect(gen.next(areGamesFetched).value).toEqual(
      put(fetchGamesHandshake({ country: countrySelector }))
    );

    expect(gen.next().value).toEqual(
      call(waitForSelector, isGamesHandshakeLoaded)
    );

    const response = { games: [] };
    const clearGameList = { id, games: response.games };
    const clearEntities = {
      [ENTITY_KEYS.GAME_LIST]: clearGameList,
    };

    expect(gen.next({ response }).value).toEqual(
      call(normalizeData, clearEntities)
    );

    expect(gen.next({ entities: clearEntities }).value).toEqual(
      put(updateEntity(clearEntities))
    );

    expect(gen.next().value).toEqual(select(gamesHandshakeSelector));

    expect(gen.next(handshake).value).toEqual(
      put(
        fetchSuggestedGamesAction(
          game,
          handshake,
          platform,
          countrySelector,
          variant
        )
      )
    );

    expect(gen.next().value).toEqual(
      take(types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE)
    );

    const gamesResponse = { games: ["foo"] };
    const gameList = { id, games: gamesResponse.games };
    const entities = {
      [ENTITY_KEYS.GAME_LIST]: gameList,
    };

    expect(gen.next({ response: gamesResponse }).value).toEqual(
      call(normalizeData, entities)
    );

    expect(gen.next({ entities }).value).toEqual(put(updateEntity(entities)));

    expect(gen.next().done).toBe(true);
  });
});
