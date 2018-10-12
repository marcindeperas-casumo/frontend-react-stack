import {
  handshakeSelector,
  applicationHandshakeSelector,
  session,
  players,
  isAuthenticated,
  playerId,
  player,
  country,
  currency,
  market,
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
} from "Reducers/handshake/selectors";

describe("Handshake selectors", () => {
  test("handshakeSelector", () => {
    const state = {
      handshake: { foo: "bar" },
    };

    expect(handshakeSelector(state)).toEqual({ foo: "bar" });
  });

  test("applicationHandshakeSelector", () => {
    const state = {
      handshake: {
        app: { foo: "app-bar" },
      },
    };

    expect(applicationHandshakeSelector(state)).toEqual({ foo: "app-bar" });
  });

  test("session", () => {
    const state = {
      handshake: {
        app: { "common/composition/session": { foo: "session" } },
      },
    };

    expect(session(state)).toEqual({ foo: "session" });
  });

  test("players", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/players": { players: { p1: { id: "p1" } } },
        },
      },
    };

    expect(players(state)).toEqual({ p1: { id: "p1" } });
  });

  describe("isAuthenticated", () => {
    test("when session is present", () => {
      const state = {
        handshake: {
          app: { "common/composition/session": { foo: "session" } },
        },
      };

      expect(isAuthenticated(state)).toBe(true);
    });

    test("when session is empty", () => {
      const state = {
        handshake: {
          app: { "common/composition/session": {} },
        },
      };

      expect(isAuthenticated(state)).toBe(false);
    });

    test("when session is null", () => {
      const state = {
        handshake: {
          app: {},
        },
      };

      expect(isAuthenticated(state)).toBe(false);
    });
  });

  test("playerId", () => {
    const state = {
      handshake: {
        app: { "common/composition/session": { id: "id-123" } },
      },
    };

    expect(playerId(state)).toEqual("id-123");
  });

  test("player", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": { players: { p1: { id: "p1" } } },
        },
      },
    };

    expect(player(state)).toEqual({ id: "p1" });
  });

  test("player", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                contactInfo: { primaryAddress: { country: "mt" } },
              },
            },
          },
        },
      },
    };

    expect(country(state)).toEqual("mt");
  });

  test("player", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                wallet: { balance: { iso4217CurrencyCode: "EUR" } },
              },
            },
          },
        },
      },
    };

    expect(currency(state)).toEqual("EUR");
  });

  test("player", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                market: "foo",
              },
            },
          },
        },
      },
    };

    expect(market(state)).toEqual("foo");
  });

  test("gamesHandshakeSelector", () => {
    const state = {
      handshake: {
        games: {
          foo: "game-bar",
        },
      },
    };

    expect(gamesHandshakeSelector(state)).toEqual({
      foo: "game-bar",
    });
  });

  describe("isGamesHandshakeLoaded", () => {
    test("when game handshake is present", () => {
      const state = {
        handshake: {
          games: {
            foo: "game-bar",
          },
        },
      };

      expect(isGamesHandshakeLoaded(state)).toBe(true);
    });

    test("when game handshake is not present", () => {
      const state = {
        handshake: {},
      };

      expect(isGamesHandshakeLoaded(state)).toBe(false);
    });

    test("when game handshake is empty", () => {
      const state = {
        handshake: {
          games: {},
        },
      };

      expect(isGamesHandshakeLoaded(state)).toBe(false);
    });
  });
});
