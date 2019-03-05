import { getGameProviders, URL } from "./api.casinoPlayerGames";
import { ENTITY_KEYS } from "Models/schema";

describe("API/casinoPlayerGames", () => {
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
      expect(http.get).toHaveBeenCalledWith(URL.GAME_PROVIDERS);
    });

    test("should normalize output", async done => {
      const call = await getGameProviders(http);
      const output = { [`${ENTITY_KEYS.GAME_PROVIDER}s`]: [] };

      expect(call).toEqual(output);
      done();
    });
  });
});
