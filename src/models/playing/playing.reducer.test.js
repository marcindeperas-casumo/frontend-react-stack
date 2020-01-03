import { playingAction } from "./playing.actions";
import reducer from "./playing.reducer";

describe("Models/Playing/Reducer", () => {
  test("PLAYING", () => {
    const playing = { state: true, gameId: "foo" };
    const action = playingAction(playing);
    const state = {};

    expect(reducer(state, action)).toEqual(playing);
  });
});
