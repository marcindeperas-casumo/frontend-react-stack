import {
  liveTableEntitySelector,
  liveTableSelector,
} from "./liveCasino.selectors";

describe("Models/Jackpots/Selectors", () => {
  const state = {
    schema: {
      liveTable: {
        one: { tableId: "one" },
        two: { tableId: "two" },
        three: { tableId: "three" },
        four: { tableId: "four" },
      },
    },
  };

  describe("liveTableEntitySelector()", () => {
    test("selects liveTables from state", () => {
      expect(liveTableEntitySelector(state)).toEqual(state.schema.liveTable);
    });

    test("returns empty object if no liveTables yet", () => {
      expect(liveTableEntitySelector({})).toEqual({});
    });
  });

  describe("liveTableSelector()", () => {
    test("returns liveTable object by id", () => {
      const id = "one";
      const table = liveTableSelector(id)(state);
      const expectedTable = state.schema.liveTable[id];

      expect(table).toEqual(expectedTable);
    });

    test("returns 'null' if liveTable doesn not exist", () => {
      const id = "one";
      const liveTable = liveTableSelector(id)({});

      expect(liveTable).toEqual(null);
    });
  });
});
