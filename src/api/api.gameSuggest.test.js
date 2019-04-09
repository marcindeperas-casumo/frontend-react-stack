import { getSuggestedGames, URLS } from "./api.gameSuggest";

describe("api/game-suggest", () => {
  const http = {
    get: jest.fn(),
  };
  const gameSlug = "starburst";

  describe("getSuggestedGames()", () => {
    test("calls http.get() with the right URL", () => {
      getSuggestedGames({ gameSlug }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(`${URLS.GAME_SUGGEST}${gameSlug}`);
    });
  });
});
