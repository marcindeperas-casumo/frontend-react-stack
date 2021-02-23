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

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
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

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ page: string; data: { sort: st... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ page: string; data: { sort: st... Remove this comment to see the full error message
    expect(gameBrowserReducer(state, action)).toEqual({ ...state, scroll });
  });
});
