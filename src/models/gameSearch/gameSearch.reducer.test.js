import { postFetch } from "Models/fetch";
import * as actions from "./gameSearch.actions";
import reducer from "./gameSearch.reducer";

describe("Models/Fetch/Reducer", () => {
  test("GAME_SEARCH_FETCH_COUNT", () => {
    const query = "star";
    const action = actions.initFetchGameSearchCount(query);
    const state = {};

    expect(reducer(state, action)).toEqual({
      query,
      loading: true,
    });
  });

  test("GAME_SEARCH_CLEAR", () => {
    const action = actions.clearSearch();
    const state = {};

    expect(reducer(state, action)).toEqual({
      count: 0,
      loading: false,
      query: "",
    });
  });

  test("GAME_SEARCH_FETCH_COMPLETE", () => {
    const state = {};
    const platform = "mobile";
    const country = "gb";
    const query = "hola";
    const action = actions.fetchGameSearch({ platform, country, query });
    const postFetchAction = postFetch(action.postFetch, {});

    expect(reducer(state, postFetchAction)).toEqual({ loading: false });
  });

  test("GAME_SEARCH_FETCH_SUGGESTED_GAMES_START", () => {
    const game = "whatever";
    const action = actions.initFetchSuggested(game);
    const state = {};

    expect(reducer(state, action)).toEqual({
      loadingSuggested: true,
      gameSuggested: game,
    });
  });

  test("GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE", () => {
    const state = {};
    const game = "whatever";
    const handshake = {};
    const platform = "mobile";
    const country = "gb";
    const variant = "default";
    const action = actions.fetchSuggestedGamesAction({
      game,
      handshake,
      platform,
      country,
      variant,
    });
    const postFetchAction = postFetch(action.postFetch, {});

    expect(reducer(state, postFetchAction)).toEqual({
      loadingSuggested: false,
    });
  });
});
