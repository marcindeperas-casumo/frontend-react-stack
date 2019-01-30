import { types as fetchTypes } from "Models/fetch";
import {
  preloadFetchPlayerGames,
  fetchPlayerGames,
  initFetchQuerySearch,
  clearSearch,
  fetchQuerySearch,
  fetchLatestPlayedGames,
  fetchGamesByProviderGameNames,
  fetchMostPopularGames,
  types,
} from "Models/gameSearch";

describe("Models/GameSearch/Actions", () => {
  describe("fetchPlayerGames()", () => {
    const action = fetchPlayerGames();

    test("init fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_PLAYER_GAMES_START,
      });
    });

    test("fires completed action when finished", () => {
      expect(action).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE,
      });
    });

    test("passes the fetch function to the action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });
  });

  describe("preloadFetchPlayerGames()", () => {
    const action = preloadFetchPlayerGames();

    test("returns an action with the correct type", () => {
      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH_PLAYER_GAMES,
      });
    });
  });

  describe("initFetchQuerySearch()", () => {
    const action = initFetchQuerySearch("hi");

    test("returns an action with the correct type and query", () => {
      expect(action).toEqual({
        type: types.GAME_SEARCH_FETCH,
        q: "hi",
      });
    });
  });

  describe("clearSearch()", () => {
    const action = clearSearch();

    test("returns an action with the correct type", () => {
      expect(action).toEqual({ type: types.GAME_SEARCH_CLEAR });
    });
  });

  describe("fetchQuerySearch()", () => {
    const platform = "mobile";
    const country = "gb";
    const q = "query";
    const action = fetchQuerySearch({ platform, country, q });

    test("init api fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.GAME_SEARCH_FETCH_START,
      });
    });

    test("fires completed finished", () => {
      expect(action).toMatchObject({
        postFetch: types.GAME_SEARCH_FETCH_COMPLETE,
      });
    });

    test("passes fetch function to the action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes params to the fetcher function", () => {
      expect(action.asyncCallData).toEqual({ platform, country, q });
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
});
