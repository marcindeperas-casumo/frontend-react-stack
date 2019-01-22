import { types as fetchTypes } from "Models/fetch";
import { types } from "./gameSearch.constants";
import { fetchPlayerGames, initFetchPlayerGames } from "./gameSearch.actions";

describe("Models/GameSearch/Actions", () => {
  describe("fetchPlayerGames()", () => {
    test("initiates api fetch", () => {
      expect(fetchPlayerGames()).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_PLAYER_GAMES_START,
      });
    });

    test("fires completed action when fetch finished", () => {
      expect(fetchPlayerGames()).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE,
      });
    });

    test("passes the fetcher function to the action", () => {
      const action = fetchPlayerGames();
      expect(typeof action.asyncCall).toBe("function");
    });
  });

  describe("initFetchPlayerGames()", () => {
    test("returns an action with the correct type", () => {
      const action = initFetchPlayerGames();

      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH_PLAYER_GAMES,
      });
    });
  });
});
