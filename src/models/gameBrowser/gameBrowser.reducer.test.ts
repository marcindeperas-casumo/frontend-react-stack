import * as actions from "./gameBrowser.actions";
import { gameBrowserReducer } from "./gameBrowser.reducer";

describe("Models/GameBrowser/Reducer", () => {
  describe("SET_DATA", () => {
    test("set with additional data", () => {
      const page = "top";
      const data = {
        sort: "A-Z",
        filters: {
          gameProviders: ["netent"],
        },
      };
      const action = actions.setData({
        page,
        ...data,
      });
      const state = {};

      expect(gameBrowserReducer(state, action)).toEqual({ page, data });
    });

    test("set only page", () => {
      const page = "top";
      const action = actions.setData({
        page,
      });
      const state = {
        page: "slots",
        data: {
          sort: "A-Z",
        },
      };

      expect(gameBrowserReducer(state, action)).toEqual({ page, data: {} });
    });
  });

  test("SET_SCROLL_POSITION", () => {
    const scroll = 1234;
    const action = actions.setScroll(scroll);
    const state = {
      page: "slots",
      data: {
        sort: "A-Z",
      },
    };

    expect(gameBrowserReducer(state, action)).toEqual({ ...state, scroll });
  });
});
