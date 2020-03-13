// @flow
import { initReelRaceWidget } from "./reelRaceWidget.actions";
import { types } from "./reelRaceWidget.constants";

jest.mock("Api/api.reelRaces");

describe("Models/reelRaceWidget/Actions", () => {
  test("initReelRaceWidget()", () => {
    const action = initReelRaceWidget();

    expect(action).toEqual({
      type: types.REEL_RACE_WIDGET_INIT,
    });
  });
});
