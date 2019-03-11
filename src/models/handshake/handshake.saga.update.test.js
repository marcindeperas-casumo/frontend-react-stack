import { updatePlayerFirstDepositDateSaga } from "Models/handshake";

describe("handshake saga update", () => {
  test("should call action updateFirstDepositDate", () => {
    const isFirstDeposit = true;
    const player = { playerId: 123, firstDepositDate: 5555555 };
    const generator = updatePlayerFirstDepositDateSaga();

    generator.next();
    generator.next(isFirstDeposit);
    generator.next(player);

    expect(generator.next().done).toBe(true);
  });

  test("should not call action updateFirstDepositDate", () => {
    const isFirstDeposit = false;
    const generator = updatePlayerFirstDepositDateSaga();

    generator.next();
    generator.next(isFirstDeposit);

    expect(generator.next().done).toBe(true);
  });
});
