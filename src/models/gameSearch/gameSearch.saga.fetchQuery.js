import { pluck } from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import {
  country as countrySelector,
  playerId as playerIdSelector,
} from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchQuerySearch,
  fetchLatestPlayedGames,
  fetchGamesByProviderGameNames,
} from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

const entitySearch = ({ loading = false, games }) => ({
  [ENTITY_KEYS.GAME_LIST]: {
    id: "gameSearch",
    loading,
    games,
  },
});

export function* fetchQuerySaga(action) {
  const platform = "mobile";
  const variant = "default";
  const country = yield select(countrySelector);
  const { q } = action;

  const loading = yield call(normalizeData, entitySearch({ loading: true }));
  yield put(updateEntity(loading.entities));

  if (!q) {
    const notLoading = yield call(normalizeData, entitySearch({ games: [] }));

    return yield put(updateEntity(notLoading.entities));
  }

  yield put(fetchQuerySearch({ platform, country, q }));

  const { response } = yield take(types.GAME_SEARCH_FETCH_COMPLETE);
  const { games } = response;
  // no results!
  if (!games.length) {
    return;
  }

  const { entities } = yield call(normalizeData, entitySearch({ games }));
  yield put(updateEntity(entities));

  // direct hit
  if (games.length === 1) {
    const playerId = yield select(playerIdSelector);

    yield put(fetchLatestPlayedGames({ playerId }));

    const { response } = yield take(
      types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE
    );

    const latestPlayedGames = pluck("gameName", response);

    // fetch the games by provider game slugs
    yield put(
      fetchGamesByProviderGameNames({
        platform,
        country,
        variant,
        providerGameNames: latestPlayedGames,
      })
    );

    const gamesBySlugs = yield take(
      types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE
    );

    const gamesBySlugsNormalized = yield call(
      normalizeData,
      gamesBySlugs.response
    );

    // save the games
    yield put(updateEntity(gamesBySlugsNormalized.entities));

    // save the gameList with correct game slugs
    const { entities } = yield call(normalizeData, {
      [ENTITY_KEYS.GAME_LIST]: {
        id: "latestPlayedGames",
        games: gamesBySlugsNormalized.result.games,
      },
    });

    yield put(updateEntity(entities));
  }
}
