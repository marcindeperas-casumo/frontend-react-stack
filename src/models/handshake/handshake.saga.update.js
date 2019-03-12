import { put, select } from "redux-saga/effects";
import {
  updateHandshake,
  hasMadeFirstDeposit,
  player as playerSelector,
  APP_COMMON_KEYS,
} from "Models/handshake";
import { complement } from "ramda";

export function* updatePlayerFirstDepositDateSaga(depositDate = Date.now()) {
  const hasNeverMadeADeposit = yield select(complement(hasMadeFirstDeposit));

  if (hasNeverMadeADeposit) {
    const playerInfo = yield select(playerSelector);
    /*
      We are 'faking' the first-deposit date as this is currently not included
      in the CometD response message.
    */
    const firstDepositDate = depositDate;

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
