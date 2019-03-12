import {
  curatedSelector,
  isCuratedLoadedFactory,
  curatedSlugSelector,
} from "Models/curated";

const mockPlayerId = "2bb42ab0-7937-11e8-b6b5-0242ac11000b";

const mockState = {
  schema: {
    cms: {
      "curated.curated-gb_en": {
        fields: {
          critical_for_compliance: false,
          header: "5 Weeks of<br />Winter Games",
          primary_action_text: "",
          small_image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-mobile.png",
          medium_image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-portrait1.png",
          large_image:
            "https://cms.casumo.com/wp-content/uploads/2018/11/wintergames-tablet-landscape1.png",
          game: [],
          promotions_legal_text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, pellentesque sagittis tincidunt malesuada condimentum eleifend pretium.",
          subtitle: "PROMOTIONS",
        },
      },
    },
    game: {
      "topwheel-treasures": {
        name: "Topwheel Treasures",
        slug: "topwheel-treasures",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/08/TopwheelTreasuresBack.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2018/08/TTLogo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: "munbzmuueehqaavs",
        lobby: "munbzmuueehqaavs",
      },
    },
  },
};

describe("Models/curated/selectors", () => {
  describe("curatedSelector()", () => {
    test("should return empty object if page not fetched", () => {
      const state = { schema: { cms: "page", game: "game" } };
      const selector = curatedSelector(state);

      expect(selector(state)).toEqual({});
    });
  });

  describe("isCuratedLoadedFactory()", () => {
    test("should return false if Curated page not loaded", () => {
      const state = { schema: { cms: "page", game: "game" } };
      const slug = "se_sv";
      const selector = isCuratedLoadedFactory(slug);

      expect(selector(state)).toEqual(false);
    });

    test("return true if Curated loaded and no game", () => {
      const state = { ...mockState };
      const slug = "curated.curated-gb_en";
      state.schema.cms[slug].fields.game = [];
      const selector = isCuratedLoadedFactory(slug);

      expect(selector(state)).toEqual(true);
    });

    test("return false if Curated page loaded with game but no gameData", () => {
      const state = { ...mockState };
      state.schema.cms["curated.curated-gb_en"].fields.game = ["topwheel"];
      const slug = "se_sv";
      const selector = isCuratedLoadedFactory(slug);

      expect(selector(state)).toEqual(false);
    });

    test("return true if Curated loaded with game and gameData", () => {
      const state = { ...mockState };
      const slug = "curated.curated-gb_en";
      state.schema.cms[slug].fields.game = ["topwheel-treasures"];
      const selector = isCuratedLoadedFactory(slug);

      expect(selector(state)).toEqual(true);
    });
  });

  describe("curatesSlugSelector", () => {
    test("return welcome offer slug if player has never deposited", () => {
      const state = {
        handshake: {
          app: {
            "common/composition/session": {
              id: mockPlayerId,
              sessionId: "d11e2d96-7dcb-42fb-b055-fbc0f66b8016",
            },
            "common/composition/players": {
              players: {
                [mockPlayerId]: {
                  playerId: mockPlayerId,
                  firstDepositDate: null,
                  market: "gb_en",
                },
              },
            },
            "common/ABTesting": {
              testSubjectId: "79e686cc-8e51-41e4-991f-dc0da0b526ad",
              features: [
                {
                  name: "deposit-now",
                  flavour: "curated-card",
                },
              ],
            },
          },
        },
      };

      const welcomeSlug = "welcome-offer-test";
      const expectedSlug = `curated.${welcomeSlug}`;
      const cardSlug = "curated-gb_en";

      const selector = curatedSlugSelector(cardSlug);

      expect(selector(state)).toEqual(expectedSlug);
    });

    test("return default slug if player made a deposit", () => {
      const state = {
        handshake: {
          app: {
            "common/composition/session": {
              id: mockPlayerId,
              sessionId: "d11e2d96-7dcb-42fb-b055-fbc0f66b8016",
            },
            "common/composition/players": {
              players: {
                [mockPlayerId]: {
                  playerId: mockPlayerId,
                  firstDepositDate: 532738800000,
                  market: "gb_en",
                },
              },
            },
            "common/ABTesting": {
              testSubjectId: "79e686cc-8e51-41e4-991f-dc0da0b526ad",
              features: [
                {
                  name: "deposit-now",
                  flavour: "curated-card",
                },
              ],
            },
          },
        },
      };
      const cardSlug = "curated-gb_en";
      const expectedSlug = `curated.${cardSlug}`;
      const selector = curatedSlugSelector(cardSlug);

      expect(selector(state)).toEqual(expectedSlug);
    });
  });
});
