import { cacheFunction, SimpleCache } from "./utils";

describe("cacheFunction()", () => {
  const subjectFn = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should call fn once", async () => {
    const cachedFn = cacheFunction({
      fn: subjectFn
    });

    await cachedFn();
    await cachedFn();

    expect(subjectFn).toHaveBeenCalledTimes(1);
  });

  test("should call fn again if the cache is invalidated", async () => {
    const cache = SimpleCache();
    const cachedFn = cacheFunction({
      fn: subjectFn,
      cache
    });

    await cachedFn();
    cache.invalidate();
    await cachedFn();

    expect(subjectFn).toHaveBeenCalledTimes(2);
  });

  test("should return the cached value ", async () => {
    subjectFn.mockReturnValue("foo");
    const cachedFn = cacheFunction({
      fn: subjectFn
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
      cache
    });

    const resultFirstCall = await cachedFn();

    cache.invalidate();
    subjectFn.mockReturnValue("bar");
    const resultSecondCall = await cachedFn();

    expect(resultFirstCall).toEqual("foo");
    expect(resultSecondCall).toEqual("bar");
  });
});
