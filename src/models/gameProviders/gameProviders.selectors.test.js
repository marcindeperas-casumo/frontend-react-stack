import {
  activeGameProvidersSelector,
  gameProviderBySlug,
  areProviderGamesLoaded,
  areGameProvidersLoaded,
} from "./gameProviders.selectors";

const PROVIDERS = {
  NYX: "casumo-services-ltd-nyx",
  NETENT: "casumo-services-ltd-netent",
};

describe("Game Providers Selectors", () => {
  test("areGameProvidersLoaded", () => {
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

  test("areGameProvidersLoaded", () => {
    const state = {
      schema: {
        gameProvider: {},
      },
    };

    expect(areGameProvidersLoaded(state)).toEqual(false);
  });

  test("activeGameProvidersSelector", () => {
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

  test("gameProviderBySlug", () => {
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

  test("gameProviderBySlug", () => {
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

  test("areProviderGamesLoaded", () => {
    const state = {
      schema: {
        gameProvider: {
          [PROVIDERS.NYX]: {
            id: 1,
            games: [],
            inMaintenance: false,
          },
        },
      },
    };
    expect(areProviderGamesLoaded(PROVIDERS.NYX)(state)).toEqual(false);
  });

  test("areProviderGamesLoaded", () => {
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
