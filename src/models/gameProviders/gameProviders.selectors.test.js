import {
  activeGameProvidersSelector,
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
            [PROVIDERS.NYX]: {
              inMaintenance: false,
            },
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

  describe("activeGameProvidersSelector", () => {
    test("should return providers that are not in maintenance", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              inMaintenance: false,
            },
            [PROVIDERS.NETENT]: {
              inMaintenance: true,
            },
          },
        },
      };

      expect(activeGameProvidersSelector(state)).toEqual({
        [PROVIDERS.NYX]: {
          inMaintenance: false,
        },
      });
    });
  });

  describe("gameProviderBySlug", () => {
    test("should return correct provider", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
              inMaintenance: false,
            },
            [PROVIDERS.NETENT]: {
              id: 2,
              inMaintenance: false,
            },
          },
        },
      };

      expect(gameProviderBySlug(PROVIDERS.NYX)(state)).toEqual({
        id: 1,
        inMaintenance: false,
      });
    });

    test("should return empty object when provider isn't found", () => {
      const state = {
        schema: {
          gameProvider: {
            [PROVIDERS.NYX]: {
              id: 1,
              inMaintenance: false,
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
              inMaintenance: false,
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
              inMaintenance: false,
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
              inMaintenance: false,
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
              inMaintenance: false,
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
              inMaintenance: false,
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
              inMaintenance: false,
            },
          },
        },
      };

      expect(areProviderGamesLoaded(PROVIDERS.NYX)(state)).toEqual(true);
    });
  });
});
