import { put, select, take, call } from "redux-saga/effects";
import { propEq, find } from "ramda";
import { showModal } from "Models/modal";
import { waitForSelector } from "Utils";
import { REACT_APP_MODAL, MARKETS } from "Src/constants";
import { marketSelector, playerIdSelector } from "Models/handshake";
import { types, getAllLimits, limitTypes } from "Models/compliance/denmark";

export function* danishOverlaySaga(action) {
  yield call(waitForSelector, playerIdSelector);
  yield call(waitForSelector, marketSelector);

  const playerId = yield select(playerIdSelector);
  const market = yield select(marketSelector);

  if (market === MARKETS.dk_da) {
    yield put(getAllLimits({ playerId }));

    const { response } = yield take(types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED);

    if (
      !find(propEq("limitType", limitTypes.DEPOSIT_LIMIT))(response.moneyLimits)
    ) {
      const modalConfig = {
        mustAccept: true,
      };
      yield put(
        showModal(REACT_APP_MODAL.ID.DANISH_ENTRY_OVERLAY, modalConfig)
      );
    }
  }
}
