import { isEverythingFetchedForGamesLists } from "Reducers/games/games.selectors";

describe("Games Selectors", () => {
  describe("isEverythingFetchedForGamesLists()", () => {
    test("returns TRUE if both app and games handshakes are loaded", () => {
      const state = {
        handshake: { app: { foo: "bar" }, games: { foo: "bar" } },
      };
      const isFetched = isEverythingFetchedForGamesLists(state);

      expect(isFetched).toBe(true);
    });

    test("returns FALSE if any of the handshakes are not loaded", () => {
      const appHandshakeEmpty = { handshake: { games: { foo: "bar" } } };
      const gamesHandshakeEmpty = { handshake: { app: { foo: "bar" } } };
      const allEmpty = { handshake: {} };

      expect(isEverythingFetchedForGamesLists(appHandshakeEmpty)).toBe(false);
      expect(isEverythingFetchedForGamesLists(gamesHandshakeEmpty)).toBe(false);
      expect(isEverythingFetchedForGamesLists(allEmpty)).toBe(false);
    });
  });
});
