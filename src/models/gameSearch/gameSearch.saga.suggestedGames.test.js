import { select, put, take, call } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
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
  fetchLatestPlayedSaga,
  initFetchSuggested,
  gameForSuggestionsSelector,
} from "Models/gameSearch";
import { waitForSelector } from "Utils";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/fetchSuggestedGamesSaga", () => {
  const game = { slug: "starburst" };
  const gameSlug = game.slug;
  const gen = cloneableGenerator(fetchSuggestedGamesSaga)(game);
  const platform = "mobile";
  const id = GAME_LIST_IDS.SUGGESTED_GAMES_SEARCH;
  const areGamesFetched = false;
  const variant = "default";
  const handshake = { foo: "bar" };

  gen.next();
  gen.next(countrySelector);

  const sameGameAsPreviousGen = gen.clone();

  test("searching suggestions for same game as previous one, games already in store, stop saga", () => {
    expect(sameGameAsPreviousGen.next("starburst").done).toBe(true);
  });

  gen.next(gameForSuggestionsSelector);

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

  expect(gen.next().value).toEqual(put(initFetchSuggested(gameSlug)));

  expect(gen.next().value).toEqual(select(gamesHandshakeSelector));

  expect(gen.next(handshake).value).toEqual(
    put(
      fetchSuggestedGamesAction({
        game,
        handshake,
        platform,
        country: countrySelector,
        variant,
      })
    )
  );

  expect(gen.next().value).toEqual(
    take(types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE)
  );

  const latestGen = gen.clone();

  test("empty game suggestions response, fetch latest played games instead", () => {
    const gamesResponseLatest = {};

    expect(latestGen.next({ response: gamesResponseLatest }).value).toEqual(
      call(fetchLatestPlayedSaga)
    );

    expect(latestGen.next().done).toBe(true);
  });

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
