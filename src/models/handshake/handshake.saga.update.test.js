import { put } from "redux-saga/effects";
import {
  updatePlayerFirstDepositDateSaga,
  updateHandshake,
  APP_COMMON_KEYS,
} from "Models/handshake";

describe("handshake saga update", () => {
  test("should update the handshake if the user has never made a deposit", () => {
    const depositDate = 111;
    const generator = updatePlayerFirstDepositDateSaga(depositDate);
    const hasNeverMadeADeposit = true;
    const player = { playerId: 123, firstDepositDate: depositDate };

    const app = {
      [APP_COMMON_KEYS.PLAYERS]: {
        players: {
          [player.playerId]: {
            ...player,
          },
        },
      },
    };

    generator.next();
    generator.next(hasNeverMadeADeposit);

    expect(generator.next(player).value).toEqual(put(updateHandshake({ app })));
    expect(generator.next().done).toBe(true);
  });

  test("should not update handshake if the has done a deposit previously", () => {
    const generator = updatePlayerFirstDepositDateSaga();
    const hasNeverMadeADeposit = false;

    generator.next();
    generator.next(hasNeverMadeADeposit);

    expect(generator.next().done).toBe(true);
  });
});
