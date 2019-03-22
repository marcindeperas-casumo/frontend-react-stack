import { ENVS } from "Src/constants";
import {
  bridgeFactory,
  generateColumns,
  getEnv,
  makeProtocolAwareUrl,
  matchingGroups,
  renderBets,
  sanitizeObject,
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

  describe("sanitizeObject()", () => {
    test("fills the specified paths in the object with ******", async () => {
      const input = {
        a: 1,
        b: {
          c: {
            d: 3,
            f: 2,
            g: 5,
          },
        },
        e: "abd",
      };
      const expectedOutput = {
        a: 1,
        b: {
          c: {
            d: "******",
            f: "******",
            g: 5,
          },
        },
        e: "******",
      };
      const keysToExclude = ["b.c.d", "b.c.f", "e"];

      expect(sanitizeObject(input, keysToExclude)).toEqual(expectedOutput);
    });
  });

  describe("getEnv()", () => {
    test("returns the development environment if env is not set", () => {
      const nodeEnv = "";
      const env = getEnv(nodeEnv);

      expect(env).toBe(ENVS.DEVELOPMENT);
    });

    test("returns the development environment if env is unknown", () => {
      const nodeEnv = "foobar";
      const env = getEnv(nodeEnv);

      expect(env).toBe(ENVS.DEVELOPMENT);
    });

    test("returns the environment if it is a known environment", () => {
      const nodeEnv = ENVS.AUTOMATED_TESTS;
      const env = getEnv(nodeEnv);

      expect(env).toBe(ENVS.AUTOMATED_TESTS);
    });

    test("finds the environment even if it is lowercase", () => {
      const nodeEnv = "automated_tests";
      const env = getEnv(nodeEnv);

      expect(env).toBe(ENVS.AUTOMATED_TESTS);
    });

    test("only returns the production env=production and it is casumo.com", () => {
      const nodeEnv = ENVS.PRODUCTION;
      const windowProd = { location: { hostname: "www.casumo.com" } };
      const windowTest = { location: { hostname: "www.casumotest.com" } };
      const windowStage = { location: { hostname: "www.casumostage.com" } };

      expect(getEnv(nodeEnv, windowProd)).toBe(ENVS.PRODUCTION);
      expect(getEnv(nodeEnv, windowTest)).not.toBe(ENVS.PRODUCTION);
      expect(getEnv(nodeEnv, windowStage)).not.toBe(ENVS.PRODUCTION);
    });

    test("returns the test env if env=production and it is casumotest.com", () => {
      const nodeEnv = ENVS.PRODUCTION;
      const windowTest = { location: { hostname: "www.casumotest.com" } };
      const windowStage = { location: { hostname: "www.casumostage.com" } };

      expect(getEnv(nodeEnv, windowTest)).toBe(ENVS.TEST);
      expect(getEnv(nodeEnv, windowStage)).toBe(ENVS.TEST);
    });
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
