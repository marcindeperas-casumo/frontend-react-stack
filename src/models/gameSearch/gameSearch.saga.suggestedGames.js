import { select, put, take, call } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  countrySelector,
  fetchGamesHandshake,
  isGamesHandshakeLoaded,
  gamesHandshakeSelector,
  types as handshakeTypes,
} from "Models/handshake";
import { waitForSelector } from "Utils";
import { isFetchingStarted } from "Models/fetch";
import {
  types,
  fetchSuggestedGamesAction,
  fetchLatestPlayedSaga,
  initFetchSuggested,
  gameForSuggestionsSelector,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

export function* fetchSuggestedGamesSaga(game) {
  const platform = "mobile";
  const variant = "default";
  const country = yield select(countrySelector);
  const id = GAME_LIST_IDS.SUGGESTED_GAMES_SEARCH;
  const gameSlug = game.slug;
  const lastGameForSuggestions = yield select(gameForSuggestionsSelector);

  // check if game is the same as previous search and eventually return straight away
  if (gameSlug === lastGameForSuggestions) {
    return;
  }

  const areGamesFetched = yield select(
    isFetchingStarted(handshakeTypes.FETCH_GAMES_HANDSHAKE)
  );

  // We need the Games Lists for fetchSuggestedGamesAction to work
  if (!areGamesFetched) {
    yield put(fetchGamesHandshake({ country }));
  }

  // Wait for the Games Lists handshake to be loaded before running the rest
  yield call(waitForSelector, isGamesHandshakeLoaded);

  // make sure to remove any suggested games if they already exists
  const emptyGameList = { id, games: [] };
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: emptyGameList,
  });

  yield put(updateEntity(entities));

  yield put(initFetchSuggested(gameSlug));

  const handshake = yield select(gamesHandshakeSelector);

  yield put(
    fetchSuggestedGamesAction(game, handshake, platform, country, variant)
  );

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE
  );

  if (!response.games) {
    return yield call(fetchLatestPlayedSaga);
  }

  const gameList = { id, games: response.games };
  const { entities: gameListEntities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(gameListEntities));
}
