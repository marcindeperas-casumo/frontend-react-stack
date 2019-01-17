import { normalizeData, updateEntity } from "Models/schema";
import { call, put, take } from "redux-saga/effects";
import { fetchGameSearchListSaga } from "./gameSearch.saga.fetchGameSearchListSaga";
import { fetchGameListAllGames } from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

describe("Models/GameSearch/Saga", () => {
  test("fetchGameSearchListSaga()", () => {
    const generator = fetchGameSearchListSaga();

    const platform = "mobile";
    const country = "gb";
    const id = "allGames";
    const page = null;
    const pageSize = null;

    generator.next();

    expect(generator.next(country).value).toEqual(
      put(fetchGameListAllGames({ platform, country, id, page, pageSize }))
    );

    expect(generator.next().value).toEqual(
      take(types.GAME_SEARCH_FETCH_ALL_GAMES_COMPLETE)
    );

    const response = { games: ["foo"] };
    const gameList = { id: "allGames", games: response.games };
    expect(generator.next({ response }).value).toEqual(
      call(normalizeData, { gameList })
    );

    const entities = { someEntity: { id: 1 } };
    expect(generator.next({ entities }).value).toEqual(
      put(updateEntity(entities))
    );
  });
});
