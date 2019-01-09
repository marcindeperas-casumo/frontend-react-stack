import { call } from "redux-saga/effects";
import { launchGame } from "Services/LaunchGameService";

export function* launchGameSaga({ slug }) {
  yield call(launchGame, { slug });
}
