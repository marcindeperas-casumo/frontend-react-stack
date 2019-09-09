import { ENTITY_KEYS } from "Models/schema";
import { playingSelector } from "./playing.selectors";
import { PLAYING_STATE } from "./playing.constants";

describe("Models/Playing/Selectors", () => {
  describe("playingSelector", () => {
    test("returns playing object", () => {
      const playing = { state: PLAYING_STATE.STARTED, gameId: "foo" };
      const state = { [ENTITY_KEYS.PLAYING]: playing };

      expect(playingSelector(state)).toEqual(playing);
    });
  });
});