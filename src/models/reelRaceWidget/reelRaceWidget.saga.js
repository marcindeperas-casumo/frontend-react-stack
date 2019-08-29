// @flow
import { put, select, take } from "redux-saga/effects";
import { playerIdSelector } from "Models/handshake";
// import { updateEntity } from "Models/schema";
import {
  isReelRacesFetched,
  fetchReelRaces,
  types as reelRacesTypes,
} from "Models/reelRaces";
// import { types } from "./reelRaceWidget.constants";

export function* fetchReelRaceWidgetSaga(): * {
  const playerId = yield select(playerIdSelector);
  const isFetched = yield select(isReelRacesFetched);

  if (isFetched) {
    return;
  }

  yield put(fetchReelRaces({ playerId }));

  const {
    response: { tournaments },
  } = yield take(reelRacesTypes.FETCH_COMPLETED);

  // eslint-disable-next-line no-console
  console.log(tournaments);
}
