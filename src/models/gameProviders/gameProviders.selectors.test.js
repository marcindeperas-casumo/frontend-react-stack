import {
  gameProviderBySlug,
  areProviderGamesLoaded,
  areGameProvidersLoaded,
  gameProviderGameCount,
  gameProviderGames,
} from "./gameProviders.selectors";

const PROVIDERS = {
  NYX: "casumo-services-ltd-nyx",
  NETENT: "casumo-services-ltd-netent",
};

describe("Game Providers Selectors", () => {
  describe("areGameProvidersLoaded()", () => {
    test("should return true when there are providers in the schema", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {},
          },
        },
      };

      expect(areGameProvidersLoaded(state)).toEqual(true);
    });

    test("should return false when there aren't providers in the schema", () => {
      const state = {
        schema: {
          gameProvider: {},
        },
      };

      expect(areGameProvidersLoaded(state)).toEqual(false);
    });
  });

  describe("gameProviderBySlug", () => {
    test("should return correct provider", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
            },
            [PROVIDERS.NETENT]: {
              id: 2,
            },
          },
        },
      };

      expect(gameProviderBySlug(PROVIDERS.NYX)(state)).toEqual({
        id: 1,
      });
    });

    test("should return empty object when provider isn't found", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
            },
          },
        },
      };

      expect(gameProviderBySlug("foo")(state)).toEqual({});
    });
  });

  describe("gameProviderGameCount", () => {
    test("should return the value of the prop gameCount", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
              games: ["foo"],
              gameCount: 1,
            },
          },
        },
      };

      expect(gameProviderGameCount(PROVIDERS.NYX)(state)).toEqual(1);
    });

    test("should return 0 when gameCount prop is unset", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
            },
          },
        },
      };

      expect(gameProviderGameCount(PROVIDERS.NYX)(state)).toEqual(0);
    });
  });

  describe("gameProviderGames", () => {
    test("should return the values in the games prop", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
              games: ["foo", "bar"],
            },
          },
        },
      };

      expect(gameProviderGames(PROVIDERS.NYX)(state)).toEqual(["foo", "bar"]);
    });

    test("should return empty array when there are no games", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
            },
          },
        },
      };

      expect(gameProviderGames(PROVIDERS.NYX)(state)).toEqual([]);
    });
  });

  describe("areProviderGamesLoaded", () => {
    test("should return false when the provider games aren't in the schema yet", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
            },
          },
        },
      };
      expect(areProviderGamesLoaded(PROVIDERS.NYX)(state)).toEqual(false);
    });

    test("should return true when there's at least one provider game", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
              games: ["foo"],
            },
          },
        },
      };

      expect(areProviderGamesLoaded(PROVIDERS.NYX)(state)).toEqual(true);
    });
  });
});
