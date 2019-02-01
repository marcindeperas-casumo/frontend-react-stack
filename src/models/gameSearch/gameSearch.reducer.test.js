import * as actions from "./gameSearch.actions";
import reducer from "./gameSearch.reducer";

describe("Models/Fetch/Reducer", () => {
  test("GAME_SEARCH_FETCH_PLAYER_GAMES", () => {
    const action = actions.preloadFetchPlayerGames();
    const state = {};

    expect(reducer(state, action)).toEqual({
      hasNoResults: false,
      loading: true,
    });
  });

  test("GAME_SEARCH_FETCH", () => {
    const action = actions.initFetchQuerySearch();
    const state = {};

    expect(reducer(state, action)).toEqual({
      hasNoResults: false,
      loading: true,
    });
  });

  test("GAME_SEARCH_NO_RESULTS", () => {
    const action = actions.noResultsAction();
    const state = {};

    expect(reducer(state, action)).toEqual({ hasNoResults: true });
  });

  test("GAME_SEARCH_NO_LATEST_PLAYED", () => {
    const action = actions.noLatestPlayedAction();
    const state = {};

    expect(reducer(state, action)).toEqual({ hasNoLatestPlayed: true });
  });

  test("GAME_SEARCH_CLEAR", () => {
    const action = actions.clearSearch();
    const state = {};

    expect(reducer(state, action)).toEqual({
      loading: false,
      hasNoResults: false,
    });
  });
});
