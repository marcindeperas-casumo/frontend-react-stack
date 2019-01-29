import { select, put, take, call } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { country as countrySelector } from "Models/handshake";
import {
  types,
  listTypes,
  fetchPlayerGames,
  fetchMostPopularGames,
} from "Models/gameSearch";

export function* fetchPopularGamesSaga() {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const id = listTypes.POPULAR_GAMES_ID;
  const pageSize = 50;

  // fetch the games by provider game slugs
  yield put(
    fetchMostPopularGames({
      platform,
      country,
      id,
      pageSize,
    })
  );

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_MOSTPOPULAR_COMPLETE
  );
  const gameList = { id, games: response.games };

  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}
