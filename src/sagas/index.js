import { types as appTypes } from "Reducers/app";
import { types as fetchTypes } from "Reducers/fetch";
import { types as gameTypes } from "Reducers/games";
import { types as cmsTypes, fetchPageBySlugSaga } from "Reducers/cms";
import {
  TYPES as cometdTypes,
  CHANNELS as cometdChannels,
  cometdSubscribeSaga,
  cometdUnsubscribeSaga,
  takeChannel,
} from "Reducers/cometd";
import { fork, takeEvery } from "redux-saga/effects";
import { appSaga } from "Sagas/app";
import { fetchSaga } from "Sagas/fetch";
import { launchGameSaga } from "Sagas/games/index";
import { jackpotsUpdatesSaga } from "Reducers/jackpots";

export default function* rootSaga(dispatch) {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);
  yield fork(takeEvery, gameTypes.LAUNCH_GAME, launchGameSaga);
  yield fork(takeEvery, cmsTypes.FETCH_PAGE_BY_SLUG, fetchPageBySlugSaga);
  yield fork(takeEvery, cometdTypes.COMETD_UNSUBSCRIBE, cometdUnsubscribeSaga);
  yield fork(takeEvery, cometdTypes.COMETD_SUBSCRIBE, cometdSubscribeSaga);
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.JACKPOTS),
    jackpotsUpdatesSaga
  );
}
