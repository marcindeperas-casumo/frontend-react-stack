import { ENTITY_KEYS } from "Models/schema";
import { playerSessionIsValidSelector } from "./session.selectors";

describe("Models/Session/Selectors", () => {
  describe("playerSessionIsValidSelector", () => {
    test("returns session object", () => {
      const session = { valid: true };
      const state = { [ENTITY_KEYS.PLAYER_SESSION]: session };

      expect(playerSessionIsValidSelector(state)).toBe(true);
    });
  });
});
