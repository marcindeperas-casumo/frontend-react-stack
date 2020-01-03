import { ENTITY_KEYS } from "Models/schema";
import { playingSelector } from "./playing.selectors";

describe("Models/Playing/Selectors", () => {
  describe("playingSelector", () => {
    test("returns playing object", () => {
      const playing = { state: true, gameId: "foo" };
      const state = { [ENTITY_KEYS.PLAYING]: playing };

      expect(playingSelector(state)).toEqual(playing);
    });
  });
});
