// @flow
import { renderHook } from "@testing-library/react-hooks";
import { useKambiMarketFromUrlPrefix } from "./useKambiMarketFromUrlPrefix";

describe("useUrlPrefixMarket", () => {
  describe("happy path for `en-gb`", () => {
    const { result } = renderHook(() => useKambiMarketFromUrlPrefix("en-gb"));

    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      expect(result.current).toMatchObject({
        kambiMarket: "GB",
        locale: "en_GB",
        market: "gb_en",
      });
    });
  });

  describe("happy path for `no`", () => {
    const { result } = renderHook(() => useKambiMarketFromUrlPrefix("no"));

    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      expect(result.current).toMatchObject({
        kambiMarket: "NO",
        locale: "no_NO",
        market: "no_no",
      });
    });
  });

  describe("default path", () => {
    const { result } = renderHook(() => useKambiMarketFromUrlPrefix("lol"));

    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      expect(result.current).toMatchObject({
        market: "___en",
        kambiMarket: "GB",
        locale: "en_GB",
      });
    });
  });
});
