import { isEmpty, isNil } from "ramda";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { sessionId as session } from "Models/handshake";
import {
  gameProviderBySlug,
  fetchGameProviders,
  areGameProvidersLoaded,
  gameProviderGames,
  types as gameProviderTypes,
  gameProviderGameCount,
} from "Models/gameProviders";
import { waitForSelector } from "Utils";
import { requestError } from "Models/fetch";
import {
  fetchPlayerGamesCount,
  types as playerGamesTypes,
} from "Models/playerGames";
import { call, put, take, select } from "redux-saga/effects";
import { types } from "./games.constants";
import { initiateFetchGamesByProvider } from "./games.actions";

export function* fetchGamesByProviderSaga({ provider, page, pageSize }) {
  const areProvidersLoaded = yield select(areGameProvidersLoaded);
  if (!areProvidersLoaded) {
    yield put(fetchGameProviders());
    yield call(waitForSelector, areGameProvidersLoaded);

    const providerData = yield select(gameProviderBySlug(provider));
    if (isNil(providerData) || isEmpty(providerData)) {
      yield put(
        requestError(
          gameProviderTypes.GET_GAME_PROVIDER_ERROR,
          "Provider not found"
        )
      );
      return;
    }
  }

  const sessionId = yield select(session);

  yield put(
    initiateFetchGamesByProvider({ provider, sessionId, page, pageSize })
  );

  const newGamesAction = yield take(types.FETCH_GAMES_BY_PROVIDER_COMPLETE);
  const currentGames = yield select(gameProviderGames(provider));

  const gameCount = yield select(gameProviderGameCount(provider));

  if (!gameCount) {
    yield put(fetchPlayerGamesCount({ provider, sessionId }));
    const { response } = yield take(
      playerGamesTypes.PLAYER_GAMES_FETCH_COUNT_COMPLETE
    );
    const { entities } = yield call(normalizeData, {
      [ENTITY_KEYS.GAME_PROVIDER]: {
        slug: provider,
        gameCount: response,
        games: [...currentGames, ...newGamesAction.response],
      },
    });
    yield put(mergeEntity(entities));
  } else {
    const { entities } = yield call(normalizeData, {
      [ENTITY_KEYS.GAME_PROVIDER]: {
        slug: provider,
        gameCount,
        games: [...currentGames, ...newGamesAction.response],
      },
    });
    yield put(mergeEntity(entities));
  }
}
