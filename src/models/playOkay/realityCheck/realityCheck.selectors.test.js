// @flow
import { realityCheckSelector } from "./realityCheck.selectors";

describe("Models/playOkay/realityCheck/.selectors", () => {
  test("realityCheckSelector", () => {
    expect(
      realityCheckSelector({
        player: {
          realityCheck: {
            everything: "everything",
          },
        },
      })
    ).toEqual({
      everything: "everything",
    });
  });
});
