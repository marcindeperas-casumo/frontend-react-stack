import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import { types as appTypes, appSaga } from "Models/app";
import { types as fetchTypes, fetchSaga } from "Models/fetch";
import { CURATED_SLUG, fetchCuratedGameSaga } from "Models/curated";
import {
  liveCasinoTypes,
  fetchAllLiveCasinoGamesSaga,
  liveCasinoUpdatesSaga,
} from "Models/liveCasino";
import { jackpotsUpdatesSaga } from "Models/jackpots";
import {
  types as gameProviderTypes,
  fetchGameProvidersSaga,
  getGameProviderSaga,
} from "Models/gameProviders";
import {
  types as gameTypes,
  launchGameSaga,
  fetchGamesBySlugsSaga,
  fetchGameListSaga,
  fetchGamesByProviderSaga,
} from "Models/games";
import {
  types as cmsTypes,
  getFetchCompleteTypeBySlug,
  fetchPageBySlugSaga,
} from "Models/cms";
import {
  TYPES as jackpotsMustDropTypes,
  fetchJackpotsMustDropSaga,
  jackpotsMustDropUpdateSaga,
} from "Models/jackpotsMustDrop";
import {
  CHANNELS as cometdChannels,
  TYPES as cometdTypes,
  cometdSubscribeSaga,
  cometdUnsubscribeSaga,
  takeChannel,
} from "Models/cometd";
import {
  types as gameSearchTypes,
  gameSearchSaga,
  clearSearchResultsSaga,
} from "Models/gameSearch";
import {
  types as playerGamesTypes,
  fetchPlayerGamesSaga,
  fetchPlayerGamesCountSaga,
} from "Models/playerGames";

export default function* rootSaga(dispatch) {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
  yield fork(takeEvery, gameTypes.INIT_FETCH_GAME_LISTS, fetchGameListSaga);
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);
  yield fork(takeEvery, gameTypes.LAUNCH_GAME, launchGameSaga);
  yield fork(takeEvery, cmsTypes.FETCH_PAGE_BY_SLUG, fetchPageBySlugSaga);
  yield fork(takeEvery, cometdTypes.COMETD_UNSUBSCRIBE, cometdUnsubscribeSaga);
  yield fork(takeEvery, cometdTypes.COMETD_SUBSCRIBE, cometdSubscribeSaga);
  yield fork(takeEvery, jackpotsMustDropTypes.FETCH, fetchJackpotsMustDropSaga);
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.JACKPOTS),
    jackpotsUpdatesSaga
  );
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.MUST_DROP_JACKPOTS),
    jackpotsMustDropUpdateSaga
  );
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.LIVE_CASINO_TABLE),
    liveCasinoUpdatesSaga
  );
  yield fork(
    takeEvery,
    action => action.type.startsWith(getFetchCompleteTypeBySlug(CURATED_SLUG)),
    fetchCuratedGameSaga
  );
  yield fork(
    takeEvery,
    gameTypes.FETCH_GAMES_BY_SLUGS_START,
    fetchGamesBySlugsSaga
  );
  yield fork(
    takeEvery,
    gameTypes.FETCH_GAMES_BY_PROVIDER_START,
    fetchGamesByProviderSaga
  );
  yield fork(
    takeEvery,
    gameProviderTypes.GET_GAME_PROVIDER,
    getGameProviderSaga
  );
  yield fork(
    takeEvery,
    gameProviderTypes.FETCH_GAME_PROVIDERS_START,
    fetchGameProvidersSaga
  );
  yield fork(
    takeEvery,
    liveCasinoTypes.FETCH_ALL_LIVE_GAMES_INIT,
    fetchAllLiveCasinoGamesSaga
  );
  yield fork(
    takeEvery,
    playerGamesTypes.PLAYER_GAMES_FETCH,
    fetchPlayerGamesSaga
  );
  yield fork(
    takeEvery,
    playerGamesTypes.PLAYER_GAMES_FETCH_COUNT,
    fetchPlayerGamesCountSaga
  );
  yield all([
    fork(takeLatest, gameSearchTypes.GAME_SEARCH_FETCH, gameSearchSaga),
    fork(takeLatest, gameSearchTypes.GAME_SEARCH_CLEAR, clearSearchResultsSaga),
  ]);
}
