import { fork, takeEvery } from "redux-saga/effects";
import { types as appTypes, appSaga } from "Models/app";
import { types as fetchTypes, fetchSaga } from "Models/fetch";
import { CURATED_SLUG, fetchCuratedGameSaga } from "Models/curated";
import { liveCasinoUpdatesSaga } from "Models/liveCasino";
import { jackpotsUpdatesSaga } from "Models/jackpots";
import {
  types as gameTypes,
  launchGameSaga,
  fetchGamesBySlugsSaga,
  fetchGameListSaga,
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
  fetchPlayerGamesSaga,
  fetchQuerySaga,
} from "Models/gameSearch";

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
    gameSearchTypes.GAME_SEARCH_FETCH_PLAYER_GAMES,
    fetchPlayerGamesSaga
  );
  yield fork(takeEvery, gameSearchTypes.GAME_SEARCH_FETCH, fetchQuerySaga);
}
