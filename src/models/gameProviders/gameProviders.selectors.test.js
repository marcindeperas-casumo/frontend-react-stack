import {
  activeGameProvidersSelector,
  gameProviderBySlug,
  areProviderGamesLoaded,
  areGameProvidersLoaded,
} from "./gameProviders.selectors";

describe("Game Providers Selectors", () => {
  test("areGameProvidersLoaded", () => {
    const state = {
      schema: {
        gameProvider: {
          "casumo-services-ltd-nyx": {
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
          "casumo-services-ltd-nyx": {
            inMaintenance: false,
          },
          "casumo-services-ltd-netent": {
            inMaintenance: true,
          },
        },
      },
    };

    expect(activeGameProvidersSelector(state)).toEqual({
      "casumo-services-ltd-nyx": {
        inMaintenance: false,
      },
    });
  });

  test("gameProviderBySlug", () => {
    const state = {
      schema: {
        gameProvider: {
          "casumo-services-ltd-nyx": {
            id: 1,
            inMaintenance: false,
          },
          "casumo-services-ltd-netent": {
            id: 2,
            inMaintenance: false,
          },
        },
      },
    };

    expect(gameProviderBySlug("casumo-services-ltd-nyx")(state)).toEqual({
      id: 1,
      inMaintenance: false,
    });
  });

  test("gameProviderBySlug", () => {
    const state = {
      schema: {
        gameProvider: {
          "casumo-services-ltd-nyx": {
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
          "casumo-services-ltd-nyx": {
            id: 1,
            games: [],
            inMaintenance: false,
          },
        },
      },
    };
    expect(areProviderGamesLoaded("casumo-services-ltd-nyx")(state)).toEqual(
      false
    );
  });

  test("areProviderGamesLoaded", () => {
    const state = {
      schema: {
        gameProvider: {
          "casumo-services-ltd-nyx": {
            id: 1,
            games: ["foo"],
            inMaintenance: false,
          },
        },
      },
    };

    expect(areProviderGamesLoaded("casumo-services-ltd-nyx")(state)).toEqual(
      true
    );
  });
});
