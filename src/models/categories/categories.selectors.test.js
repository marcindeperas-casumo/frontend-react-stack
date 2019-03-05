import { gameProvidersListSelector } from "./categories.selectors";

describe("Category List Selectors", () => {
  describe("gameProvidersListSelector", () => {
    test("should transform game provider data correctly", () => {
      const state = {
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
          background:
            "https://cms.casumo.com/wp-content/uploads/2019/02/nyx-bg.png",
          logo: "https://cms.casumo.com/wp-content/uploads/2019/02/nyx.png",
          url: "/en/games/provider/casumo-services-ltd-nyx",
        },
      ];

      expect(gameProvidersListSelector(state)).toEqual(output);
    });
  });
});
