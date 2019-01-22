import { normalizeData, updateEntity } from "Models/schema";
import { call, put, take } from "redux-saga/effects";
import { fetchPlayerGamesSaga } from "./gameSearch.saga.fetchPlayerGames";
import { fetchPlayerGames } from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

describe("Models/GameSearch/Saga", () => {
  test("fetchPlayerGamesSaga()", () => {
    const generator = fetchPlayerGamesSaga();

    expect(generator.next().value).toEqual(put(fetchPlayerGames()));

    expect(generator.next().value).toEqual(
      take(types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE)
    );

    const response = { games: ["foo"] };
    const gameList = { id: "allPlayerGames", games: response.games };
    expect(generator.next({ response }).value).toEqual(
      call(normalizeData, { gameList })
    );

    const entities = { someEntity: { id: 1 } };
    expect(generator.next({ entities }).value).toEqual(
      put(updateEntity(entities))
    );
  });
});
