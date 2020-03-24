import {
  playerWalletAmountSelector,
  playerWalletSelector,
  playerWalletBonusSelector,
  playerWalletCurrencySelector,
  playerCurrencySelector,
  playerPaymentsTextsSelector,
  playerBonusTextSelector,
  playerBalanceAmountSelector,
  playerSessionIsValidSelector,
  playerLogoutStartedSelector,
} from "./player.selectors";

const wallet = {
  amount: 1011.7908,
  bonus: 94.3192,
  iso4217CurrencyCode: "EUR",
};
const handshake = {
  app: {
    "common/composition/session": { id: "id-123" },
    "common/composition/players": {
      players: {
        "id-123": {
          wallet: {
            balance: {
              amount: 111,
              iso4217CurrencyCode: "USD",
            },
          },
          bonus: {
            balance: {
              amount: 111,
              iso4217CurrencyCode: "USD",
            },
          },
        },
      },
    },
  },
};
const schema = {
  cms: {
    "features.payments": {
      fields: {
        text_fields: [
          {
            key: "text_bonus",
            value: "Bonus",
          },
          {
            key: "text_deposit",
            value: "Deposit",
          },
        ],
      },
    },
  },
};
const state = {
  schema,
  handshake,
  player: {
    wallet,
  },
};
const state2 = {
  handshake,
  player: { wallet: {} },
};

describe("Player selectors", () => {
  describe("playerWalletSelector", () => {
    test("Getting wallet object", () => {
      expect(playerWalletSelector(state)).toEqual(wallet);
    });
  });

  describe("playerWalletAmountSelector", () => {
    test("Getting amount", () => {
      expect(playerWalletAmountSelector(state)).toEqual(wallet.amount);
    });

    test("Should get 0", () => {
      expect(playerWalletAmountSelector(state2)).toEqual(0);
    });
  });

  describe("playerWalletBonusSelector", () => {
    test("Getting bonus", () => {
      expect(playerWalletBonusSelector(state)).toEqual(wallet.bonus);
    });

    test("Should get handshake amount", () => {
      expect(playerWalletBonusSelector(state2)).toEqual(111);
    });
  });

  describe("playerWalletCurrencySelector", () => {
    test("Getting currency", () => {
      expect(playerWalletCurrencySelector(state)).toEqual(
        wallet.iso4217CurrencyCode
      );
    });

    test("Should get nothing", () => {
      expect(playerWalletCurrencySelector(state2)).toEqual(undefined);
    });
  });

  describe("playerCurrencySelector", () => {
    test("Getting currency", () => {
      expect(playerCurrencySelector(state)).toEqual(wallet.iso4217CurrencyCode);
    });

    test("Should get handshake value if there is no value in player state", () => {
      expect(playerCurrencySelector(state2)).toEqual(
        handshake.app["common/composition/players"].players["id-123"].wallet
          .balance["iso4217CurrencyCode"]
      );
    });
  });

  describe("playerPaymentsTextsSelector", () => {
    test("Getting payments translations", () => {
      expect(playerPaymentsTextsSelector(state)).toEqual({
        textBonus: "Bonus",
        textDeposit: "Deposit",
      });
    });

    test("Getting no text", () => {
      expect(playerPaymentsTextsSelector(state2)).toEqual({});
    });
  });

  describe("playerBonusTextSelector", () => {
    test("Getting bonus text", () => {
      expect(playerBonusTextSelector(state)).toEqual(
        schema.cms["features.payments"].fields["text_fields"][0].value
      );
    });

    test("Getting no text", () => {
      expect(playerBonusTextSelector(state2)).toEqual(undefined);
    });
  });

  describe("playerBalanceAmountSelector", () => {
    test("Getting balance amount from wallet", () => {
      expect(playerBalanceAmountSelector(state)).toEqual(wallet.amount);
    });

    test("Getting balance amount from handshake", () => {
      const result =
        handshake.app["common/composition/players"].players["id-123"].wallet
          .balance.amount -
        handshake.app["common/composition/players"].players["id-123"].bonus
          .balance.amount;

      expect(playerBalanceAmountSelector(state2)).toEqual(result);
    });
  });

  describe("playerSessionIsValidSelector", () => {
    test("returns true if player sessionValid is true", () => {
      expect(
        playerSessionIsValidSelector({ player: { sessionValid: true } })
      ).toBe(true);
    });

    test("returns false if player sessionValid is false", () => {
      expect(
        playerSessionIsValidSelector({ player: { sessionValid: false } })
      ).toBe(false);
    });
  });

  describe("playerLogoutStartedSelector", () => {
    test("returns true if player logoutStarted is true", () => {
      expect(
        playerLogoutStartedSelector({ player: { logoutStarted: true } })
      ).toBe(true);
    });

    test("returns false if player logoutStarted is false", () => {
      expect(
        playerLogoutStartedSelector({ player: { logoutStarted: false } })
      ).toBe(false);
    });
  });
});
