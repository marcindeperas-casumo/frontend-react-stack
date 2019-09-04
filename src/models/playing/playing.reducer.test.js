import { playingAction } from "./playing.actions";
import reducer from "./playing.reducer";
import { PLAYING_STATE } from "./playing.constants";

describe("Models/Playing/Reducer", () => {
  test("PLAYING", () => {
    const playing = { state: PLAYING_STATE.STARTED, gameId: "foo" };
    const action = playingAction(playing);
    const state = {};

    expect(reducer(state, action)).toEqual(playing);
  });
});
