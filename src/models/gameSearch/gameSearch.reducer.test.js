import * as actions from "./gameSearch.actions";
import { postFetch } from "Models/fetch";
import reducer from "./gameSearch.reducer";

describe("Models/Fetch/Reducer", () => {
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

  test("GAME_SEARCH_FETCH_COMPLETE", () => {
    const state = {};
    const platform = "mobile";
    const country = "gb";
    const query = "hola";
    const action = actions.fetchQuerySearch({ platform, country, query });
    const postFetchAction = postFetch(action.postFetch, {});

    expect(reducer(state, postFetchAction)).toEqual({ loading: false });
  });
});
