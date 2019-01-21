import { types as fetchTypes } from "Models/fetch";
import { types } from "./gameSearch.constants";
import { fetchGameListAllGames, fetchAllGames } from "./gameSearch.actions";

describe("Models/GameSearch/Actions", () => {
  describe("fetchGameListAllGames()", () => {
    test("initiates api fetch", () => {
      expect(fetchGameListAllGames()).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_ALL_GAMES_START,
      });
    });

    test("fires completed action when fetch finished", () => {
      expect(fetchGameListAllGames()).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_ALL_GAMES_COMPLETE,
      });
    });

    test("passes the fetcher function to the action", () => {
      const action = fetchGameListAllGames();
      expect(typeof action.asyncCall).toBe("function");
    });
  });

  describe("fetchAllGames()", () => {
    test("returns an action with the correct type", () => {
      const action = fetchAllGames();

      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH_ALL_GAMES,
      });
    });
  });
});
