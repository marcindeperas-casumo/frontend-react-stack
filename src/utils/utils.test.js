import { ENVS } from "Src/constants";
import {
  arrayToObject,
  bridgeFactory,
  cacheFunction,
  generateColumns,
  getEnv,
  invokePath,
  makeProtocolAwareUrl,
  matchingGroups,
  renderBets,
  sanitizeObject,
  SimpleCache,
} from "./utils";

describe("invokePath()", () => {
  describe("when the path provided is a function on the object provided", () => {
    test("should invoke with an empty array of arguments by default", () => {
      const mockFn = jest.fn();
      const obj = { someProp: { someFn: (...args) => mockFn(args) } };
      const path = ["someProp", "someFn"];

      invokePath(path, obj);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith([]);
    });

    test("should invoke with arguments if provided", () => {
      const mockFn = jest.fn();
      const obj = { someProp: { someFn: (...args) => mockFn(args) } };
      const path = ["someProp", "someFn"];
      const args = [42, "answer", true];

      invokePath(path, obj, args);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(args);
    });
  });

  describe("when the path provided is not a function on the object provided", () => {
    test("should not error", () => {
      const obj = { someProp: { someNonFn: 42 } };
      const path = ["someProp", "someNonFn"];
      const args = [42, "answer", true];

      // no expect required, ensure no exception was thrown
      invokePath(path, obj, args);
    });
  });
});

describe("bridgeFactory()", () => {
  test("should return a bridge instance", () => {
    const bridge = bridgeFactory();

    expect(bridge.on).toBeInstanceOf(Function);
    expect(bridge.emit).toBeInstanceOf(Function);
  });
});

describe("cacheFunction()", () => {
  const subjectFn = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should call fn once", async () => {
    const cachedFn = cacheFunction({
      fn: subjectFn,
    });

    await cachedFn();
    await cachedFn();

    expect(subjectFn).toHaveBeenCalledTimes(1);
  });

  test("should call fn again if the cache is invalidated", async () => {
    const cache = SimpleCache();
    const cachedFn = cacheFunction({
      fn: subjectFn,
      cache,
    });

    await cachedFn();
    cache.invalidate();
    await cachedFn();

    expect(subjectFn).toHaveBeenCalledTimes(2);
  });

  test("should return the cached value ", async () => {
    subjectFn.mockReturnValue("foo");
    const cachedFn = cacheFunction({
      fn: subjectFn,
    });

    const resultFirstCall = await cachedFn();
    subjectFn.mockReturnValue("bar");
    const resultSecondCall = await cachedFn();

    expect(resultFirstCall).toEqual(resultSecondCall);
  });

  test("should return the new value after the cache has been invalidated", async () => {
    subjectFn.mockReturnValue("foo");
    const cache = SimpleCache();
    const cachedFn = cacheFunction({
      fn: subjectFn,
      cache,
    });

    const resultFirstCall = await cachedFn();

    cache.invalidate();
    subjectFn.mockReturnValue("bar");
    const resultSecondCall = await cachedFn();

    expect(resultFirstCall).toEqual("foo");
    expect(resultSecondCall).toEqual("bar");
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

describe("arrayToObject()", () => {
  test("should return an object from an array", () => {
    const array = [
      {
        name: "michele",
        country: "it",
        spiritAnimal: "🦔",
      },
      {
        name: "jack",
        country: "uk",
        spiritAnimal: "🐧",
      },
    ];
    const result = arrayToObject(array, "name");
    expect(result).toEqual({
      michele: {
        name: "michele",
        country: "it",
        spiritAnimal: "🦔",
      },
      jack: {
        name: "jack",
        country: "uk",
        spiritAnimal: "🐧",
      },
    });
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
});
