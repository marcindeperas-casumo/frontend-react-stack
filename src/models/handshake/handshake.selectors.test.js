import stateMock, { getStateMock } from "Models/__mocks__/state.mock";
import { VERTICALS, COMPLIANCE_STATE_PROPERTY } from "Src/constants";
import * as storage from "Lib/storage";
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
  walletAmountSelector,
  bonusAmountSelector,
  marketSelector,
  languageSelector,
  getCmsHash,
  hasMadeFirstDepositSelector,
  optedInReelRacesSelector,
  adventureLevelsSelector,
  localeSelector,
  tournamentChannelsSelector,
  walletIdSelector,
  playerNameSelector,
  socialSecurityNumberSelector,
  isSuspiciousAccount,
  verticalSelector,
  featureFlagSelector,
  playerCasumoNameSelector,
  jurisdictionSelector,
  registrationDateSelector,
  complianceStatePropertySelector,
  isProductionBackendSelector,
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

  test("playerCasumoNameSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: { p1: { id: "p1", casumoName: "Maroto" } },
          },
        },
      },
    };

    expect(playerCasumoNameSelector(state)).toEqual("Maroto");
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

  test("walletAmountSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p3" },
          "common/composition/players": {
            players: {
              p3: {
                id: "p3",
                wallet: { balance: { amount: 777 } },
              },
            },
          },
        },
      },
    };

    expect(walletAmountSelector(state)).toEqual(777);
  });

  describe("bonusAmountSelector", () => {
    test("it returns amount if it is defined in handshake", () => {
      const state = {
        handshake: {
          app: {
            "common/composition/session": { id: "p3" },
            "common/composition/players": {
              players: {
                p3: {
                  id: "p3",
                  bonus: { balance: { amount: 777 } },
                },
              },
            },
          },
        },
      };

      expect(bonusAmountSelector(state)).toEqual(777);
    });

    test("it returns 0 if bonus prop is undefined", () => {
      expect(bonusAmountSelector({})).toEqual(0);
    });
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

  test("tournamentChannelsSelector", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                tournamentCampaign: {
                  tournamentChannels: ["/public/tournaments/123"],
                },
              },
            },
          },
        },
      },
    };

    expect(tournamentChannelsSelector(state)).toEqual([
      "/public/tournaments/123",
    ]);
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

  describe("verticalSelector()", () => {
    const createHandshakeStateWithWelcomeOfferId = welcomeOfferId => ({
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                welcomeOfferId,
              },
            },
          },
        },
      },
    });

    test("returns SPORTS if player has a sports welcome offer", () => {
      const state = createHandshakeStateWithWelcomeOfferId(
        "wo-sports-this-part-doesnt-mattter"
      );

      expect(verticalSelector(state)).toEqual(VERTICALS.SPORTS);
    });

    test("defaults to CASINO if welcome offer is not sports related", () => {
      const state = createHandshakeStateWithWelcomeOfferId("wo-something-else");

      expect(verticalSelector(state)).toEqual(VERTICALS.CASINO);
    });

    test("defaults correctly when welcome offer is not set", () => {
      const state1 = createHandshakeStateWithWelcomeOfferId(null);
      const state2 = createHandshakeStateWithWelcomeOfferId();
      const state3 = createHandshakeStateWithWelcomeOfferId(true);

      expect(verticalSelector(state1)).toEqual(VERTICALS.CASINO);
      expect(verticalSelector(state2)).toEqual(VERTICALS.CASINO);
      expect(verticalSelector(state3)).toEqual(VERTICALS.CASINO);
    });
  });

  describe("featureFlagSelector()", () => {
    test("checks the feature-flag in the handshake and returns TRUE if it is there", () => {
      expect(featureFlagSelector("MOBILE_VERIFICATION")(stateMock)).toBe(true);
    });

    test("checks the feature-flag in the localStorage and returns TRUE if it is there", () => {
      const featureFlag = "fooBar";
      const featureFlags = { features: [featureFlag] };

      storage.set("featureFlags", featureFlags);

      expect(featureFlagSelector(featureFlag)(stateMock)).toBe(true);
    });

    test("returns FALSE if the feature-flag is not in the handshake nor in the localStorage", () => {
      expect(featureFlagSelector("unknown")(stateMock)).toBe(false);
    });
  });

  describe("jurisdictionSelector()", () => {
    test("jurisdictionSelector", () => {
      const state = {
        handshake: {
          app: {
            "common/composition/session": { id: "p1" },
            "common/composition/players": {
              players: { p1: { id: "p1", jurisdiction: "UKGC" } },
            },
          },
        },
      };

      expect(jurisdictionSelector(state)).toEqual("UKGC");
    });
  });

  describe("registrationDateSelector()", () => {
    test("it returns correct piece of state", () => {
      const registrationDate = 1564746916000;
      const state = {
        handshake: {
          app: {
            "common/composition/session": { id: "p1" },
            "common/composition/players": {
              players: { p1: { id: "p1", registrationDate } },
            },
          },
        },
      };

      expect(registrationDateSelector(state)).toEqual(registrationDate);
    });
  });

  describe("complianceStatePropertySelector()", () => {
    const state = {
      handshake: {
        app: {
          "common/composition/session": { id: "p1" },
          "common/composition/players": {
            players: {
              p1: {
                id: "p1",
                complianceState: { DGA: { prop: "value" }, AML: "any value" },
              },
            },
          },
        },
      },
    };

    test("should return object for DGA compliance state property", () => {
      expect(
        complianceStatePropertySelector(COMPLIANCE_STATE_PROPERTY.DGA)(state)
      ).toEqual({ prop: "value" });
    });

    test("should return 'any value' for AML complaince state property", () => {
      expect(
        complianceStatePropertySelector(COMPLIANCE_STATE_PROPERTY.AML)(state)
      ).toEqual("any value");
    });
  });

  describe("isProductionBackendSelector()", () => {
    test("should return true for casumo.com", () => {
      const state = {
        handshake: {
          app: {
            "common/composition/context": {
              siteUrl: "https://www.casumo.com/",
            },
          },
        },
      };

      expect(isProductionBackendSelector(state)).toEqual(true);
    });

    test("should return false for casumotest.com", () => {
      const state = {
        handshake: {
          app: {
            "common/composition/context": {
              siteUrl: "https://www.casumotest.com/",
            },
          },
        },
      };

      expect(isProductionBackendSelector(state)).toEqual(false);
    });
  });
});
