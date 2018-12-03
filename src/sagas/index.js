import { fork, takeEvery } from "redux-saga/effects";
import { types as appTypes, appSaga } from "Models/app";
import { types as fetchTypes } from "Models/fetch";
import { types as gameTypes } from "Models/games";
import {
  fetchGamesFromIdsSaga,
  types as promotionTypes,
} from "Models/promotion";
import { CURATED_SLUG, fetchCuratedGameSaga } from "Models/curated";
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
import { jackpotsUpdatesSaga } from "Models/jackpots";
import { fetchSaga } from "Sagas/fetch";
import { launchGameSaga } from "Sagas/games/index";

export default function* rootSaga(dispatch) {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
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
    action => action.type.startsWith(getFetchCompleteTypeBySlug(CURATED_SLUG)),
    fetchCuratedGameSaga
  );
  yield fork(
    takeEvery,
    promotionTypes.PROMOTION_SHOULD_FETCH_GAMES,
    fetchGamesFromIdsSaga
  );
}
