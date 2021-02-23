// @flow
import { getAcknowledgements, getRelevantVersionsSlugs } from "./tac.selectors";

describe("TAC selectors", () => {
  test("getAcknowledgements - exist", () => {
    const state = {
      schema: {
        acknowledgements: {
          first: {
            version: 1,
            acknowledgement: {
              timestamp: 1,
            },
          },
          last: {
            version: 666,
            acknowledgement: {
              timestamp: 666,
            },
          },
        },
      },
    };

    expect(getAcknowledgements(state)).toEqual({
      first: {
        version: 1,
        timestamp: 1,
      },
      last: {
        version: 666,
        timestamp: 666,
      },
    });
  });

  test("getAcknowledgements - empty", () => {
    const state = {};
    expect(getAcknowledgements(state)).toEqual({});
  });

  test("getRelevantVersionsSlugs", () => {
    const state = {
      schema: {
        cms: {
          "toc.dgoj": { fields: {} },
          "toc.dgoj.v1": { fields: "v1 fields" },
          "toc.dgoj.v2": { fields: "v2 fields" },
        },
        acknowledgements: {
          first: {
            version: 1,
            acknowledgement: {
              timestamp: 1,
            },
          },
          last: {
            version: 2,
            acknowledgement: {
              timestamp: 2,
            },
          },
        },
      },
    };

    expect(getRelevantVersionsSlugs(state)).toEqual({
      "1": "toc.dgoj.v1",
      "2": "toc.dgoj.v2",
    });
  });
});
