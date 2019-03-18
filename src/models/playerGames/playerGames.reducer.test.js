import { postFetch } from "Models/fetch";
import * as actions from "./playerGames.actions";
import reducer from "./playerGames.reducer";

describe("Models/Fetch/Reducer", () => {
  test("PLAYER_GAMES_FETCH_COUNT_COMPLETE", () => {
    const state = {};
    const sessionId = "123";
    const action = actions.fetchPlayerGamesCount({ sessionId });
    const postFetchAction = postFetch(action.postFetch, 100);

    expect(reducer(state, postFetchAction)).toEqual({ count: 100 });
  });
});
