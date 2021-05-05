import * as actions from "./gameBrowser.actions";
import { gameBrowserReducer } from "./gameBrowser.reducer";

const parentPath = "live-casino/*";
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
      const action = actions.setData(parentPath)({
        page,
        ...data,
      });
      const state = null;

      expect(gameBrowserReducer(state, action)).toEqual({
        [parentPath]: { page, data, scroll: 0 },
      });
    });

    test("set only page", () => {
      const page = "top";
      const action = actions.setData(parentPath)({
        page,
      });
      const state = {
        [parentPath]: {
          page: "slots",
          data: {
            sort: "A-Z",
          },
          scroll: 0,
        },
      };

      expect(gameBrowserReducer(state, action)).toEqual({
        [parentPath]: {
          page,
          data: {},
          scroll: 0,
        },
      });
    });
  });

  test("SET_SCROLL_POSITION", () => {
    const scroll = 1234;
    const action = actions.setScroll(parentPath)(scroll);
    const state = {
      [parentPath]: {
        page: "slots",
        data: {
          sort: "A-Z",
        },
        scroll: 0,
      },
    };

    expect(gameBrowserReducer(state, action)).toEqual({
      ...state,
      [parentPath]: {
        ...state[parentPath],
        scroll,
      },
    });
  });
});
