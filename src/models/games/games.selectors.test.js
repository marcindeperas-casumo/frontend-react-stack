import { isGameListLoaded } from "Models/games";

const appHandshake = { foo: "bar" };
const gamesHandshake = { foo: "bar" };
const schema = { gameList: { a: 1, b: 2 } };

describe("Games Selectors", () => {
  describe("isGameListLoaded()", () => {
    test("returns TRUE if both app and games handshakes are loaded", () => {
      const state = {
        handshake: { app: appHandshake, games: gamesHandshake },
        schema,
      };
      const isLoaded = isGameListLoaded(state);

      expect(isLoaded).toBe(true);
    });

    test("returns FALSE if any of the handshakes are not loaded", () => {
      const appHandshakeEmpty = {
        handshake: { games: gamesHandshake },
        schema,
      };
      const gamesHandshakeEmpty = { handshake: { app: appHandshake }, schema };
      const allEmpty = { handshake: {} };

      expect(isGameListLoaded(appHandshakeEmpty)).toBe(false);
      expect(isGameListLoaded(gamesHandshakeEmpty)).toBe(false);
      expect(isGameListLoaded(allEmpty)).toBe(false);
    });

    test("returns FALSE the gameLists are not loaded", () => {
      const state = {
        handshake: { app: appHandshake, games: gamesHandshake },
        schema: {},
      };

      expect(isGameListLoaded(state)).toBe(false);
    });
  });
});
