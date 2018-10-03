import { types as appTypes } from "Reducers/app";
import { types as fetchTypes } from "Reducers/fetch";
import { types as gameTypes } from "Reducers/games";
import { fork, takeEvery } from "redux-saga/effects";
import { appSaga } from "Sagas/app";
import { fetchSaga } from "Sagas/fetch";
import { launchGameSaga } from "./games/index";

export default function* rootSaga() {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);
  yield fork(takeEvery, gameTypes.LAUNCH_GAME, launchGameSaga);
}
