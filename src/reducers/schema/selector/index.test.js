import {
  schemaSelector,
  gameListEntitiesSelector,
  gameEntitiesSelector,
  liveTableEntitiesSelector,
  liveCasinoEntitiesSelector,
  jackpotEntitiesSelector,
  topListIds,
  topListSelectorById,
  gameSelector,
} from "Reducers/schema/selector";
describe("Schema selectors", () => {
  test("schemaSelector", () => {
    const state = {
      schema: { foo: "bar" },
    };

    expect(schemaSelector(state)).toEqual({ foo: "bar" });
  });

  test("gameListEntitiesSelector", () => {
    const state = {
      schema: { gameList: { l1: 1 } },
    };

    expect(gameListEntitiesSelector(state)).toEqual({ l1: 1 });
  });

  test("gameEntitiesSelector", () => {
    const state = {
      schema: { game: { g1: 1 } },
    };

    expect(gameEntitiesSelector(state)).toEqual({ g1: 1 });
  });

  test("liveTableEntitiesSelector", () => {
    const state = {
      schema: { liveTable: { lt1: 1 } },
    };

    expect(liveTableEntitiesSelector(state)).toEqual({ lt1: 1 });
  });

  test("liveCasinoEntitiesSelector", () => {
    const state = {
      schema: { liveCasino: { lc1: 1 } },
    };

    expect(liveCasinoEntitiesSelector(state)).toEqual({ lc1: 1 });
  });

  test("jackpotEntitiesSelector", () => {
    const state = {
      schema: { jackpot: { j1: 1 } },
    };

    expect(jackpotEntitiesSelector(state)).toEqual({ j1: 1 });
  });

  test("topListIds", () => {
    const state = {
      schema: { gameList: { l1: 1 } },
    };

    expect(topListIds(state)).toEqual({ listIds: ["l1"] });
  });

  test("topListSelectorById", () => {
    const state = {
      schema: { gameList: { l1: { id: "l1" } } },
    };

    expect(topListSelectorById("l1")(state)).toEqual({ id: "l1" });
  });

  describe("gameSelector", () => {
    test("return the game object", () => {
      const state = {
        schema: { game: { game1: { id: "game1" } } },
      };

      expect(gameSelector("game1")(state)).toEqual({ id: "game1" });
    });

    test("attach the jackpot data based on the jackpotId", () => {
      const state = {
        schema: {
          game: {
            game1: { id: "game1", jackpotId: "j1" },
          },
          jackpot: { j1: { id: "j1", foo: "jackpot" } },
        },
      };

      expect(gameSelector("game1")(state)).toEqual({
        id: "game1",
        jackpotId: "j1",
        jackpotInfo: { id: "j1", foo: "jackpot" },
      });
    });

    test("attach the listTable data based on the tableId", () => {
      const state = {
        schema: {
          game: {
            game1: { id: "game1", tableId: "lt1" },
          },
          liveTable: { lt1: { id: "lt1", foo: "live-table" } },
        },
      };

      expect(gameSelector("game1")(state)).toEqual({
        id: "game1",
        tableId: "lt1",
        lobby: { id: "lt1", foo: "live-table" },
      });
    });

    test("ignore jackpotEntities or liveTableEntities if there are none", () => {
      const state = {
        schema: {
          game: {
            game1: { id: "game1" },
          },
        },
      };

      expect(gameSelector("game1")(state)).toEqual({
        id: "game1",
      });
    });
  });
});
