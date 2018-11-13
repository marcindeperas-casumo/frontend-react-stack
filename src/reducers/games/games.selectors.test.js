import { isGameListLoaded } from "Reducers/games/games.selectors";

const appHandshake = { foo: "bar" };
const gamesHandshake = { foo: "bar" };

describe("Games Selectors", () => {
  describe("isGameListLoaded()", () => {
    test("returns TRUE if both app and games handshakes are loaded", () => {
      const state = {
        handshake: { app: appHandshake, games: gamesHandshake },
      };
      const isLoaded = isGameListLoaded(state);

      expect(isLoaded).toBe(true);
    });

    test("returns FALSE if any of the handshakes are not loaded", () => {
      const appHandshakeEmpty = { handshake: { games: gamesHandshake } };
      const gamesHandshakeEmpty = { handshake: { app: appHandshake } };
      const allEmpty = { handshake: {} };

      expect(isGameListLoaded(appHandshakeEmpty)).toBe(false);
      expect(isGameListLoaded(gamesHandshakeEmpty)).toBe(false);
      expect(isGameListLoaded(allEmpty)).toBe(false);
    });
  });
});
