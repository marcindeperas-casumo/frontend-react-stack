import stateMock, { getStateMock } from "Models/__mocks__/state.mock";
import {
  handshakeSelector,
  applicationHandshakeSelector,
  isApplicationHandshakeLoaded,
  session,
  playersSelector,
  isAuthenticated,
  playerIdSelector,
  sessionIdSelector,
  playerSelector,
  countrySelector,
  currencySelector,
  marketSelector,
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
  languageSelector,
  getCmsHash,
  hasMadeFirstDepositSelector,
  optedInReelRacesSelector,
  adventureLevelsSelector,
  localeSelector,
  walletIdSelector,
  playerNameSelector,
  socialSecurityNumberSelector,
  isSuspiciousAccount,
} from "./handshake.selectors";

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

  describe("isApplicationHandshakeLoaded", () => {
    test("when app handshake is present", () => {
      const state = {
        handshake: {
          app: {
            foo: "app-bar",
          },
        },
      };

      expect(isApplicationHandshakeLoaded(state)).toBe(true);
    });

    test("when app handshake is not present", () => {
      const state = {
        handshake: {},
      };

      expect(isApplicationHandshakeLoaded(state)).toBe(false);
    });

    test("when app handshake is empty", () => {
      const state = {
        handshake: {
          app: {},
        },
      };

      expect(isApplicationHandshakeLoaded(state)).toBe(false);
    });
  });

  test("session", () => {
    const state = {
      handshake: {
        app: { "common/composition/session": { foo: "session" } },
      },
    };

    expect(session(state)).toEqual({ foo: "session" });
  });

  test("playersSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/players": { players: { p1: { id: "p1" } } },
        },
      },
    };

    expect(playersSelector(state)).toEqual({ p1: { id: "p1" } });
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

  test("playerIdSelector", () => {
    const state = {
      handshake: {
        app: { "common/composition/session": { id: "id-123" } },
      },
    };

    expect(playerIdSelector(state)).toEqual("id-123");
  });

  test("sessionIdSelector", () => {
    const state = {
      handshake: {
        app: { "common/composition/session": { sessionId: "id-123" } },
      },
    };

    expect(sessionIdSelector(state)).toEqual("id-123");
  });

  test("playerSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": { players: { p1: { id: "p1" } } },
        },
      },
    };

    expect(playerSelector(state)).toEqual({ id: "p1" });
  });

  test("countrySelector", () => {
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

    expect(countrySelector(state)).toEqual("mt");
  });

  test("currencySelector", () => {
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

    expect(currencySelector(state)).toEqual("EUR");
  });

  test("marketSelector", () => {
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

    expect(marketSelector(state)).toEqual("foo");
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

  describe("languageSelector()", () => {
    test("returns the language of the player if there is a player logged in", () => {
      expect(languageSelector(stateMock)).toBe("gb");
    });

    test("returns the default language if the player is not logged in", () => {
      expect(languageSelector({})).toBe("en");
    });
  });

  describe("getCmsHash()", () => {
    test("returns the CMS hash for the current player language", () => {
      // The root-content-hash for "en"
      expect(getCmsHash(stateMock)).toBe("5899f873666807d49078629b5c58ca81");
    });
  });

  describe("hasMadeFirstDepositSelector", () => {
    test("return false when firstDepositDate is null", () => {
      expect(hasMadeFirstDepositSelector(stateMock)).toBe(false);
    });

    test("returns true when firstDepositDate is not null", () => {
      const state = getStateMock({ firstDepositDate: 12345 });

      expect(hasMadeFirstDepositSelector(state)).toBe(true);
    });
  });

  test("optedInReelRacesSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                playerTournamentCampaign: {
                  tournaments: "complex object here",
                },
              },
            },
          },
        },
      },
    };

    expect(optedInReelRacesSelector(state)).toEqual("complex object here");
  });

  test("localeSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                market: "se_sv",
              },
            },
          },
        },
      },
    };

    expect(localeSelector(state)).toEqual("sv-SE");
  });

  test("walletIdSelector", () => {
    const walletId = "wallet-id-1";
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p2" },
          "common/composition/players": {
            players: {
              p2: {
                id: "p2",
                wallet: {
                  id: walletId,
                },
              },
            },
          },
        },
      },
    };

    expect(walletIdSelector(state)).toEqual(walletId);
  });

  test("adventureLevelsSelector", () => {
    const adventureDetails = [[1, 2, 3, 4, 5], [10, 20, 30, 40, 50]];
    const state = {
      handshake: {
        app: {
          "common/composition/Adventure": adventureDetails,
        },
      },
    };

    expect(adventureLevelsSelector(state)).toEqual(adventureDetails);
  });

  test("playerNameSelector", () => {
    const name = {
      firstName: "John",
      lastName: "Doe",
    };
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p2" },
          "common/composition/players": {
            players: {
              p2: {
                id: "p2",
                contactInfo: {
                  name,
                },
              },
            },
          },
        },
      },
    };

    expect(playerNameSelector(state)).toEqual(name);
  });

  test("socialSecurityNumberSelector", () => {
    const socialSecurityNumber = "xxx-xxx-xxx";
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p2" },
          "common/composition/players": {
            players: {
              p2: {
                id: "p2",
                contactInfo: {
                  socialSecurityNumber,
                },
              },
            },
          },
        },
      },
    };

    expect(socialSecurityNumberSelector(state)).toEqual(socialSecurityNumber);
  });

  test("isSuspiciousAccount", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: { p1: { id: "p1", suspiciousAccount: true } },
          },
        },
      },
    };

    expect(isSuspiciousAccount(state)).toEqual(true);
  });
});
