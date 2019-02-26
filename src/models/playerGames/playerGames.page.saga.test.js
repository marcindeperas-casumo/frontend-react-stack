import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { call, put, take } from "redux-saga/effects";
import {
  fetchPlayerGames,
  fetchPlayerGamesPageSaga,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";

describe("Models/PlayerGames/Saga", () => {
  test("fetchPlayerGamesPageSaga()", () => {
    const page = 0;
    const pageSize = 100;
    const gen = fetchPlayerGamesPageSaga({ page, pageSize });

    expect(gen.next().value).toEqual(put(fetchPlayerGames({ page, pageSize })));
    expect(gen.next().value).toEqual(take(getFetchCompleteTypeByPage(0)));

    const response = ["foo"];
    const gameList = {
      id: getPlayerGamesListIdByPage(0),
      games: response,
    };

    expect(gen.next({ response }).value).toEqual(
      call(normalizeData, { [ENTITY_KEYS.GAME_LIST]: gameList })
    );

    const entities = { someEntity: { id: 1 } };

    expect(gen.next({ entities }).value).toEqual(put(updateEntity(entities)));

    expect(gen.next().done).toBe(true);
  });
});
