import { getGameProviders, URLS } from "./api.casinoGames";
import { ENTITY_KEYS } from "Models/schema";

describe("API/casinoGames", () => {
  let http;

  describe("getGameProviders()", () => {
    beforeEach(() => {
      http = {
        get: jest.fn(() => Promise.resolve([])),
      };
    });

    test("calls http.get() with the right URL", () => {
      getGameProviders(http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URLS.GAME_PROVIDERS);
    });

    test("should normalize output", async done => {
      const call = await getGameProviders(http);
      const output = { [`${ENTITY_KEYS.GAME_PROVIDER}s`]: [] };

      expect(call).toEqual(output);
      done();
    });
  });
});
