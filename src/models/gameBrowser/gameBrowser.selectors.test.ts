import {
  getData,
  getGamePage,
  getGamePageScrollPosition,
} from "./gameBrowser.selectors";

const parentPath = "live-casino/*";
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
          [parentPath]: { data },
        },
      };

      expect(getData(parentPath)(store)).toEqual(data);
    });

    test("no data", () => {
      const store = {
        gameBrowser: {
          [parentPath]: { data: {} },
        },
      };

      expect(getData(parentPath)(store)).toEqual({ sort: null, filters: {} });
    });
  });

  describe("getGamePage", () => {
    test("data present", () => {
      const page = "top";
      const store = {
        gameBrowser: {
          [parentPath]: { page },
        },
      };

      expect(getGamePage(parentPath)(store)).toEqual(page);
    });

    test("no data", () => {
      expect(getGamePage(parentPath)({})).toEqual(undefined);
    });
  });

  describe("getGamePageScrollPosition", () => {
    test("data present", () => {
      const scroll = 666;
      const store = {
        gameBrowser: {
          [parentPath]: { scroll },
        },
      };

      expect(getGamePageScrollPosition(parentPath)(store)).toEqual(scroll);
    });

    test("no data", () => {
      expect(getGamePageScrollPosition(parentPath)({})).toEqual(0);
    });
  });
});
