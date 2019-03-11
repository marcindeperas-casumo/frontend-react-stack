import { put, select } from "redux-saga/effects";
import {
  updateHandshake,
  hasMadeFirstDeposit,
  player as playerSelector,
  APP_COMMON_KEYS,
} from "Models/handshake";
import { complement } from "ramda";

export function* updatePlayerFirstDepositDateSaga() {
  const isFirstDeposit = yield select(complement(hasMadeFirstDeposit));

  if (isFirstDeposit) {
    const playerInfo = yield select(playerSelector);
    const firstDepositDate = Date.now();

    const player = {
      [playerInfo.playerId]: {
        ...playerInfo,
        firstDepositDate,
      },
    };

    const app = {
      [APP_COMMON_KEYS.PLAYERS]: {
        players: {
          ...player,
        },
      },
    };

    yield put(
      updateHandshake({
        app,
      })
    );
  }
}
