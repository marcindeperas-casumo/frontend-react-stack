// @flow
import {
  getData,
  getGamePage,
  getGamePageScrollPosition,
} from "./gameBrowser.selectors";

describe("Models/GameBrowser/Reducer", () => {
  describe("getData", () => {
    test("data present", () => {
      const data = {
        sort: "A-Z",
        filters: {
          gameProviders: ["netent"],
        },
      };
      const store = {
        gameBrowser: {
          data,
        },
      };

      expect(getData(store)).toEqual(data);
    });

    test("no data", () => {
      const store = {
        gameBrowser: {
          data: {},
        },
      };

      expect(getData(store)).toEqual({ sort: null, filters: {} });
    });
  });

  describe("getGamePage", () => {
    test("data present", () => {
      const page = "top";
      const store = {
        gameBrowser: {
          page,
        },
      };

      expect(getGamePage(store)).toEqual(page);
    });

    test("no data", () => {
      expect(getGamePage({})).toEqual(undefined);
    });
  });

  describe("getGamePageScrollPosition", () => {
    test("data present", () => {
      const scroll = 666;
      const store = {
        gameBrowser: {
          scroll,
        },
      };

      expect(getGamePageScrollPosition(store)).toEqual(scroll);
    });

    test("no data", () => {
      expect(getGamePageScrollPosition({})).toEqual(0);
    });
  });
});
