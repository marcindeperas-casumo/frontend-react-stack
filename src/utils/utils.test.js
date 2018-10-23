import {
  cacheFunction,
  SimpleCache,
  matchingGroups,
  arrayToObject,
  makeProtocolAwareUrl,
  generateColumns,
} from "./utils";

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

describe(".generateColumns()", () => {
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
