import { pluck } from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import {
  country as countrySelector,
  playerId as playerIdSelector,
} from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchLatestPlayedGames,
  fetchGamesByProviderGameNames,
} from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

export function* fetchLatestPlayedSaga(action) {
  const platform = "mobile";
  const variant = "default";
  const country = yield select(countrySelector);
  const playerId = yield select(playerIdSelector);

  yield put(fetchLatestPlayedGames({ playerId }));

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE
  );

  const providerGameNames = pluck("gameName", response);

  // fetch the games by provider game slugs
  yield put(
    fetchGamesByProviderGameNames({
      platform,
      country,
      variant,
      providerGameNames,
    })
  );

  const { response: gamesBySlugRes } = yield take(
    types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE
  );

  const { entities, result } = yield call(normalizeData, gamesBySlugRes);
  const { games } = result;

  // save the games
  yield put(updateEntity(entities));

  // save the gameList with correct game slugs
  const { entities: gameListEntities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: "latestPlayedGames",
      games,
    },
  });

  yield put(updateEntity(gameListEntities));
}
