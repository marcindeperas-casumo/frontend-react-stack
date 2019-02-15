import { cloneableGenerator } from "redux-saga/utils";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { call, put, take } from "redux-saga/effects";
import {
  fetchPlayerGames,
  fetchPlayerGamesSaga,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";

describe("Models/PlayerGames/Saga", () => {
  test("fetchPlayerGamesSaga()", () => {
    const page = 0;
    const pageSize = 100;
    const pageLoaded = true;
    const gen = cloneableGenerator(fetchPlayerGamesSaga)({
      startIndex: 0,
      pageSize,
    });

    const pageLoadedGen = gen.clone();

    pageLoadedGen.next();
    expect(pageLoadedGen.next(pageLoaded).done).toBe(true);

    gen.next();

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
