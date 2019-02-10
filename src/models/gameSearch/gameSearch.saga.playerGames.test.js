import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { call, put, take } from "redux-saga/effects";
import {
  types,
  listTypes,
  fetchPlayerGames,
  fetchPlayerGamesSaga,
} from "Models/gameSearch";

describe("Models/GameSearch/Saga", () => {
  test("fetchPlayerGamesSaga()", () => {
    const page = 0;
    const pageSize = 0;
    const generator = fetchPlayerGamesSaga({ startIndex: 0, pageSize });

    // eslint-disable-next-line
    generator.next().value;

    expect(generator.next(page).value).toEqual(
      put(fetchPlayerGames({ page, pageSize }))
    );

    expect(generator.next().value).toEqual(
      take(`${types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE}_PAGE0`)
    );

    const response = ["foo"];
    const gameList = {
      id: `${listTypes.PLAYER_GAMES}Page${page}`,
      games: response,
    };

    expect(generator.next({ response }).value).toEqual(
      call(normalizeData, { [ENTITY_KEYS.GAME_LIST]: gameList })
    );

    const entities = { someEntity: { id: 1 } };

    expect(generator.next({ entities }).value).toEqual(
      put(updateEntity(entities))
    );

    expect(generator.next().done).toBe(true);
  });
});
