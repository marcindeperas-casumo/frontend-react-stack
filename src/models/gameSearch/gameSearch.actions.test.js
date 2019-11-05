import { types as fetchTypes } from "Models/fetch";
import { getCasinoPlayerGameSearch } from "Api/api.casinoPlayerGames";
import {
  initFetchGameSearchPage,
  clearSearch,
  fetchGameSearch,
  fetchLatestPlayedGames,
  fetchGamesByProviderGameNames,
  fetchMostPopularGames,
  types,
  getSearchFetchCompleteTypeByPage,
  fetchSuggestedGamesAction,
  initFetchSuggested,
  initFetchGameSearchCount,
  gameSearchScrollPositionReset,
} from "Models/gameSearch";
import { fetchSuggestedGames } from "Api/api.games";

describe("Models/GameSearch/Actions", () => {
  describe("initFetchGameSearchCount()", () => {
    const action = initFetchGameSearchCount("star");

    test("returns an action with the correct type and query", () => {
      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH_COUNT,
        query: "star",
      });
    });
  });

  describe("initFetchGameSearchPage()", () => {
    const startIndex = 0;
    const pageSize = 100;
    const query = "star";
    const action = initFetchGameSearchPage({ startIndex, pageSize, query });

    test("returns an action with the correct type and query", () => {
      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH_PAGE,
        query,
        pageSize,
        startIndex,
      });
    });
  });

  describe("clearSearch()", () => {
    const action = clearSearch();

    test("returns an action with the correct type", () => {
      expect(action).toEqual({ type: types.GAME_SEARCH_CLEAR });
    });
  });

  describe("initFetchSuggested()", () => {
    const game = "whatever";
    const action = initFetchSuggested(game);

    test("returns an action with the correct type", () => {
      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START,
        game,
      });
    });
  });

  describe("fetchGameSearch()", () => {
    const sessionId = "123";
    const query = "query";
    const page = 0;
    const pageSize = 5;
    const action = fetchGameSearch({ sessionId, page, pageSize, query });

    test("init api fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_START,
      });
    });

    test("fires completed finished", () => {
      expect(action).toMatchObject({
        postFetch: getSearchFetchCompleteTypeByPage(query, page),
      });
    });

    test("passes `getCasinoPlayerGameSearch` fetch function to the action", () => {
      expect(action.asyncCall).toEqual(getCasinoPlayerGameSearch);
    });

    test("passes params to the fetcher function", () => {
      expect(action.asyncCallData).toEqual({
        sessionId,
        page,
        pageSize,
        query,
      });
    });
  });

  describe("fetchLatestPlayedGames()", () => {
    const action = fetchLatestPlayedGames({ playerId: "whatever" });

    test("initiates api fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_LATEST_PLAYED_START,
      });
    });

    test("fires completed action", () => {
      expect(action).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE,
      });
    });

    test("passes fetch function to action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes parameters to fetcher function", () => {
      expect(action.asyncCallData).toEqual({ playerId: "whatever" });
    });
  });

  describe("fetchGamesByProviderGameNames()", () => {
    const platform = "mobile";
    const country = "gb";
    const variant = "default";
    const providerGameNames = ["game"];
    const action = fetchGamesByProviderGameNames({
      platform,
      country,
      variant,
      providerGameNames,
    });

    test("starts api fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_START,
      });
    });

    test("fires completed action when fetch is finished", () => {
      expect(action).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE,
      });
    });

    test("pass the fetcher function to the action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes parameters to fetch", () => {
      expect(action.asyncCallData).toEqual({
        platform,
        country,
        variant,
        providerGameNames,
      });
    });
  });

  describe("fetchMostPopularGames()", () => {
    const country = "gb";
    const id = "popularGames";
    const page = 0;
    const pageSize = 5;
    const platform = "mobile";
    const variant = "default";

    const action = fetchMostPopularGames({
      country,
      id,
      page,
      pageSize,
      platform,
      variant,
    });

    test("starts api fetch for mostPopular", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_MOSTPOPULAR_START,
      });
    });

    test("fires done action when fetch is finished", () => {
      expect(action).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_MOSTPOPULAR_COMPLETE,
      });
    });

    test("asyncCall fetcher function exists in the action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes all parameters for the fetch function", () => {
      expect(action.asyncCallData).toEqual({
        country,
        id,
        page,
        pageSize,
        platform,
        variant,
      });
    });
  });

  describe("fetchSuggestedGamesAction()", () => {
    const country = "gb";
    const handshake = { foo: "bar" };
    const game = "starburst";
    const platform = "mobile";
    const variant = "default";

    const action = fetchSuggestedGamesAction({
      game,
      handshake,
      platform,
      country,
      variant,
    });

    test("starts api fetch for suggestedGames", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START,
      });
    });

    test("fires done action when fetch is finished", () => {
      expect(action).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE,
      });
    });

    test("asyncCall fetcher function exists in the action", () => {
      expect(typeof action.asyncCall).toBe("function");
      expect(action.asyncCall).toEqual(fetchSuggestedGames);
    });

    test("passes all parameters for the fetch function", () => {
      expect(action.asyncCallData).toEqual({
        country,
        handshake,
        game,
        platform,
        variant,
      });
    });
  });

  describe("gameSearchScrollPositionReset()", () => {
    const action = gameSearchScrollPositionReset();

    test("returns an action with the correct type", () => {
      expect(action).toEqual({ type: types.GAME_SEARCH_RESET_SCROLL_POSITION });
    });
  });
});
