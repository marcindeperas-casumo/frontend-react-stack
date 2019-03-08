import {
  gameProvidersListSelector,
  gameProvidersRoute,
} from "./categories.selectors";

describe("Category List Selectors", () => {
  test("gameProvidersRoute", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                contactInfo: { primaryAddress: { country: "mt" } },
              },
            },
          },
        },
      },
    };

    expect(gameProvidersRoute(state)).toBe("/mt/games/provider");
  });

  test("gameProvidersListSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                contactInfo: { primaryAddress: { country: "mt" } },
              },
            },
          },
        },
      },
      schema: {
        gameProvider: {
          "casumo-services-ltd-nyx": {
            id: "0c900240-4904-11e6-a7a2-005056a975b1",
            name: "nyx",
            inMaintenance: false,
            slug: "casumo-services-ltd-nyx",
            background:
              "https://cms.casumo.com/wp-content/uploads/2019/02/nyx-bg.png",
            logo: "https://cms.casumo.com/wp-content/uploads/2019/02/nyx.png",
          },
        },
      },
    };

    const output = [
      {
        id: "game-provider-casumo-services-ltd-nyx",
        background:
          "https://cms.casumo.com/wp-content/uploads/2019/02/nyx-bg.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2019/02/nyx.png",
        url: "/mt/games/provider/casumo-services-ltd-nyx",
      },
    ];

    expect(gameProvidersListSelector(state)).toEqual(output);
  });
});
