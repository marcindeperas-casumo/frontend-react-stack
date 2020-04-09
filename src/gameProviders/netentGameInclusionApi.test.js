import { getOpenTablesMockData } from "./netentMocks";
import {
  mapGamesToTables,
  getFirstOpenTableForGame,
} from "./netentGameinclusionApi";

describe("Netent GameInclusion model", () => {
  describe("mapGamesToTables", () => {
    test("it should return properly mapped gameId => openTables", () => {
      expect(mapGamesToTables(getOpenTablesMockData)).toStrictEqual({
        lcroulette_mobile_sw: { openTables: [1] },
        lcroulette_not_mobile_sw: { openTables: [1] },
        lcblackjackcd_mobilelr_phy_sw: { openTables: [101, 102] },
        lcblackjackcd_not_mobilelr_phy_sw: { openTables: [101] },
        lcblackjackcd_mobilelr_sw: { openTables: [102] },
      });
    });
  });

  describe("getFirstOpenTableForGame", () => {
    test("it should return first free tableId for specific game", () => {
      expect(
        getFirstOpenTableForGame(
          "lcblackjackcd_mobilelr_phy_sw",
          getOpenTablesMockData
        )
      ).toEqual(101);
    });

    test("it should fail whenever there is no free table for the requested game", () => {
      expect(
        getFirstOpenTableForGame(
          "some_not_game_without_open_tables",
          getOpenTablesMockData
        )
      ).toBeUndefined();
    });
  });
});
