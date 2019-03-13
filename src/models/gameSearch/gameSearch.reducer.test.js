import { postFetch } from "Models/fetch";
import * as actions from "./gameSearch.actions";
import reducer from "./gameSearch.reducer";

describe("Models/Fetch/Reducer", () => {
  test("GAME_SEARCH_FETCH", () => {
    const action = actions.initFetchQuerySearch();
    const state = {};

    expect(reducer(state, action)).toEqual({
      loading: true,
    });
  });

  test("GAME_SEARCH_CLEAR", () => {
    const action = actions.clearSearch();
    const state = {};

    expect(reducer(state, action)).toEqual({
      loading: false,
      query: "",
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
