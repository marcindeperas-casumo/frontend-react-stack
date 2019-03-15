import { put, select } from "redux-saga/effects";
import { sessionId as sessionIdSelector } from "Models/handshake";
import {
  playerGamesCountSelector,
  fetchPlayerGamesCount,
  fetchPlayerGamesCountSaga,
} from "Models/playerGames";

describe("Models/PlayerGames/Saga/Count", () => {
  test("fetchPlayerGamesSaga()", () => {
    const sessionId = "123";
    const generator = fetchPlayerGamesCountSaga();

    expect(generator.next().value).toEqual(select(sessionIdSelector));
    expect(generator.next(sessionId).value).toEqual(
      select(playerGamesCountSelector)
    );
    expect(generator.next().value).toEqual(
      put(fetchPlayerGamesCount({ sessionId }))
    );
    expect(generator.next().done).toBe(true);
  });
});
