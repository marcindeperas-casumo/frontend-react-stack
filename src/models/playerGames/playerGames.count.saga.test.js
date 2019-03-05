import { put, select } from "redux-saga/effects";
import {
  playerGamesCountSelector,
  fetchPlayerGamesCount,
  fetchPlayerGamesCountSaga,
} from "Models/playerGames";

describe("Models/PlayerGames/Saga/Count", () => {
  test("fetchPlayerGamesSaga()", () => {
    const generator = fetchPlayerGamesCountSaga();

    expect(generator.next().value).toEqual(select(playerGamesCountSelector));
    expect(generator.next().value).toEqual(put(fetchPlayerGamesCount()));
    expect(generator.next().done).toBe(true);
  });
});
