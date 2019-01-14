import jackpotsMock from "Models/jackpotsMustDrop/__mocks__/jackpotsMustDrop.state.mock";
import jackpotsCmsMock from "Models/jackpotsMustDrop/__mocks__/jackpots.cms.state.mock";
import jackpotsMergedMock from "Models/jackpotsMustDrop/__mocks__/jackpots.merged.mock";
import {
  shouldFetchJackpotsMustDrop,
  isFetchedJackpotsMustDrop,
  mergeJackpotsMustDropSelectorFactory,
} from "./jackpotsMustDrop.selectors";
import { TYPES } from "./jackpotsMustDrop.constants";

describe("Models/JackpotsMustDrop/Selectors", () => {
  const cms = {
    "must-drop-jackpots": jackpotsCmsMock,
  };
  const fetch = {
    [TYPES.FETCH]: {},
  };
  const state = {
    fetch,
    schema: {
      jackpotMustDrop: jackpotsMock,
      cms,
    },
  };

  describe("shouldFetchJackpotsMustDrop()", () => {
    test("returns FALSE if the jackpots are started to be fetched", () => {
      expect(shouldFetchJackpotsMustDrop(state)).toBe(false);
    });

    test("returns TRUE if the jackpots are not fetched yet", () => {
      const state = {
        fetch: {},
        schema: {
          jackpotMustDrop: [],
          cms,
        },
      };
      expect(shouldFetchJackpotsMustDrop(state)).toBe(true);
    });
  });

  describe("isFetchedJackpotsMustDrop()", () => {
    test("returns TRUE if the jackpots are already fetched", () => {
      expect(isFetchedJackpotsMustDrop(state)).toBe(true);
    });

    test("returns FALSE if the jackpots are not started to be fetched yet", () => {
      const state = {
        fetch: {},
        schema: {
          jackpotMustDrop: [],
          cms,
        },
      };
      expect(isFetchedJackpotsMustDrop(state)).toBe(false);
    });
  });

  describe("mergeJackpotsMustDropSelector()", () => {
    test("returns the jackpot data combined with jackpot cms content", () => {
      const slug = "must-drop-jackpots";
      const selector = mergeJackpotsMustDropSelectorFactory(slug);

      expect(selector(state)).toEqual(jackpotsMergedMock);
    });

    test("should default to an empty array if cms content doesn't exist", () => {
      const selector = mergeJackpotsMustDropSelectorFactory("");

      expect(selector(state)).toEqual([]);
    });

    test("should default to an empty array if jackpot data doesn't exist", () => {
      const slug = "must-drop-jackpots";
      const selector = mergeJackpotsMustDropSelectorFactory(slug);
      const state = { schema: { cms } };

      expect(selector(state)).toEqual([]);
    });

    test("only displays jackpots that have jackpot-info and cms content", () => {
      const slug = "must-drop-jackpots";
      const selector = mergeJackpotsMustDropSelectorFactory(slug);
      const state = {
        schema: {
          cms,
          jackpotMustDrop: {
            "31001": {
              name: "Daily Drop Jackpot",
            },
            "31002": {
              name: "Must Drop Jackpot",
            },
          },
        },
      };
      const computed = selector(state);

      expect(computed).toHaveLength(2);
      expect(computed[0].id).toBe("31001");
      expect(computed[1].id).toBe("31002");
    });
  });
});
