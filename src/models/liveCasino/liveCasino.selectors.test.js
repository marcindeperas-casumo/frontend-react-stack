// @flow
import {
  liveTableEntitySelector,
  liveTableSelector,
  groupLiveGames,
  mapLobbyTranslations,
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

  describe("mapLobbyTranslations()", () => {
    const input = [
      { key: "ultimate_texas_holdem", value: "xyz" },
      { key: "roulette", value: "asdf" },
      { key: "non_existing", value: "yolo" },
    ];
    const out = {
      UTH: input[0].value,
      Roulette: input[1].value,
      non_existing: input[2].value,
    };
    expect(mapLobbyTranslations(input)).toEqual(out);
  });

  describe("groupLiveGames()", () => {
    const liveGames1 = [
      {
        slug: "one",
        lobby: {
          type: "BlackJack",
          bets: {
            min: 0.2,
            max: 300,
          },
        },
      },
      {
        slug: "two",
        lobby: {
          type: "BlackJack",
          bets: {
            min: 0.1,
            max: 666,
          },
        },
      },
    ];
    const expected1 = [["BlackJack", ["two", "one"]]]; // order changes due to difference in bets range
    expect(groupLiveGames(liveGames1)).toEqual(expected1);

    const liveGames2 = [
      {
        slug: "one",
        lobby: {
          type: "BlackJack",
          bets: {
            min: 0.1,
            max: 1000,
          },
        },
      },
      {
        slug: "two",
        lobby: {
          type: "BlackJack",
          bets: {
            min: 0.1,
            max: 666,
          },
        },
      },
      {
        slug: "three",
        lobby: {
          type: "MoneyWheel",
          bets: {
            min: 0.1,
            max: 1000,
          },
        },
      },
    ];
    const expected2 = [
      ["BlackJack", ["one", "two"]],
      ["MoneyWheel", ["three"]],
    ]; // order changes due to difference in bets range
    expect(groupLiveGames(liveGames2)).toEqual(expected2);
  });
});
