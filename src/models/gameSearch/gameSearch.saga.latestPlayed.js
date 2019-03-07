import { pluck } from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import {
  country as countrySelector,
  playerId as playerIdSelector,
} from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  types,
  fetchLatestPlayedGames,
  fetchGamesByProviderGameNames,
  fetchPopularGamesSaga,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

export function* fetchLatestPlayedSaga(action) {
  const platform = "mobile";
  const variant = "default";
  const country = yield select(countrySelector);
  const playerId = yield select(playerIdSelector);

  // fetch latest played returns provider game names
  yield put(fetchLatestPlayedGames({ playerId }));

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE
  );

  const providerGameNames = pluck("gameName", response);

  // no latest played games, grab most popular list instead
  if (!providerGameNames.length) {
    yield call(fetchPopularGamesSaga);
    return;
  }

  // fetch the games by provider game slugs
  yield put(
    fetchGamesByProviderGameNames({
      platform,
      country,
      variant,
      providerGameNames,
    })
  );

  const { response: gamesBySlug } = yield take(
    types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE
  );

  const { entities, result } = yield call(normalizeData, gamesBySlug);
  const { games } = result;

  // save the games
  yield put(updateEntity(entities));

  // save the gameList
  const { entities: gameListEntities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: GAME_LIST_IDS.LATEST_PLAYED,
      games,
    },
  });

  return yield put(updateEntity(gameListEntities));
}
