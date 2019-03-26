import {
  bridgeFactory,
  generateColumns,
  makeProtocolAwareUrl,
  matchingGroups,
  renderBets,
  createReducer,
} from "./utils";

describe("bridgeFactory()", () => {
  test("should return a bridge instance", () => {
    const bridge = bridgeFactory();

    expect(bridge.on).toBeInstanceOf(Function);
    expect(bridge.emit).toBeInstanceOf(Function);
  });
});

describe("matchingGroups()", () => {
  test("should return one unmatched if there are no matches", () => {
    const result = matchingGroups("foo", "bar");
    expect(result).toEqual([{ type: "unmatched", value: "foo" }]);
  });

  test("should return the first match occurrence", () => {
    const result = matchingGroups("foo foo", "foo");
    expect(result).toEqual([
      { type: "matched", value: "foo" },
      { type: "unmatched", value: " foo" },
    ]);
  });

  test("should return the first match occurrence at non 0", () => {
    const result = matchingGroups("bar foo foo", "foo");
    expect(result).toEqual([
      { type: "unmatched", value: "bar " },
      { type: "matched", value: "foo" },
      { type: "unmatched", value: " foo" },
    ]);
  });

  test("should return matching group at [0] if occurrence is at the beginning", () => {
    const result = matchingGroups("starburst", "star");
    expect(result).toEqual([
      { type: "matched", value: "star" },
      { type: "unmatched", value: "burst" },
    ]);
  });

  test("should return matching group at [1] if occurrence is in the middle", () => {
    const result = matchingGroups("bar bar foo sheep", "foo");
    expect(result).toEqual([
      { type: "unmatched", value: "bar bar " },
      { type: "matched", value: "foo" },
      { type: "unmatched", value: " sheep" },
    ]);
  });

  test("should return matching at the end if occurrence is at the end", () => {
    const result = matchingGroups("foo sheep", "sheep");
    expect(result).toEqual([
      { type: "unmatched", value: "foo " },
      { type: "matched", value: "sheep" },
    ]);
  });
});

describe("makeProtocolAwareUrl()", () => {
  test("should add protocol if starts with //", () => {
    expect(makeProtocolAwareUrl("//foo.com/bar")).toBe("http://foo.com/bar");
  });

  test("should add protocol and hostname if starts with /", () => {
    expect(makeProtocolAwareUrl("/bar")).toBe("http://localhost/bar");
  });

  test("should not touch it otherwise", () => {
    expect(makeProtocolAwareUrl("http://casumo.com/cometd")).toBe(
      "http://casumo.com/cometd"
    );
  });
});

describe("generateColumns()", () => {
  test("should group items of an array into columns", async () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numberByColumn = 3;

    expect(generateColumns(list, numberByColumn).length).toBe(3);
    expect(generateColumns(list, numberByColumn)[0]).toEqual([1, 2, 3]);
    expect(generateColumns(list, numberByColumn)[1]).toEqual([4, 5, 6]);
    expect(generateColumns(list, numberByColumn)[2]).toEqual([7, 8, 9]);
  });

  test("should group items even if number of items is not dividable by column number", async () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8];
    const numberByColumn = 3;

    expect(generateColumns(list, numberByColumn).length).toBe(3);
    expect(generateColumns(list, numberByColumn)[0]).toEqual([1, 2, 3]);
    expect(generateColumns(list, numberByColumn)[1]).toEqual([4, 5, 6]);
    expect(generateColumns(list, numberByColumn)[2]).toEqual([7, 8]);
  });
});

describe("renderBets()", () => {
  test("should not render anything if bets dont exist", async () => {
    const bets = null;

    expect(renderBets(bets)).toEqual("");
  });

  test("should render formatted bets", async () => {
    const bets = {
      symbol: "£",
      min: 1,
      max: 10000,
    };

    expect(renderBets(bets)).toEqual("£1 - £10000");
  });

  describe("createReducer()", () => {
    test("creates a reducer from a map of handlers", () => {
      const state = { foo: "bar" };
      const handlers = {
        ACTION_1: jest.fn().mockReturnValue("ACTION_1"),
        ACTION_2: jest.fn().mockReturnValue("ACTION_2"),
      };
      const action = { type: "ACTION_1" };
      const reducer = createReducer(state, handlers);

      expect(reducer(state, action)).toBe("ACTION_1");
    });

    test("passes down the state to the individual handlers", () => {
      const state = { foo: "bar" };
      const handlers = {
        ACTION_1: jest.fn().mockReturnValue("ACTION_1"),
        ACTION_2: jest.fn().mockReturnValue("ACTION_2"),
      };
      const action = { type: "ACTION_1" };
      const reducer = createReducer(state, handlers);

      reducer(state, action);

      expect(handlers.ACTION_1).toBeCalledTimes(1);
      expect(handlers.ACTION_1).toBeCalledWith(state, action);
    });

    test("returns with the state if there are no matching handlers found", () => {
      const state = { foo: "bar" };
      const handlers = {
        ACTION_1: jest.fn().mockReturnValue("ACTION_1"),
        ACTION_2: jest.fn().mockReturnValue("ACTION_2"),
      };
      const unknownAction = { type: "UNKNOWN" };
      const reducer = createReducer(state, handlers);

      expect(reducer(state, unknownAction)).toEqual(state);
    });
  });
});
