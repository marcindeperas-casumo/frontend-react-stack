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
      in the CometD response message. Once we have this in the message we can use that
      instead of Date.now() as a value.
      issue: https://github.com/Casumo/Home/issues/27548
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
