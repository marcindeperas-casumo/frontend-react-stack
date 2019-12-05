// @flow
import { createSelector } from "reselect";
import { propOr, prop, map, fromPairs, pipe } from "ramda";
import { getField } from "Models/cms";
import { walletAmountSelector, currencySelector } from "Models/handshake";
import { SLUGS } from "Models/player";

const player = state => state.player;

const keyPayments = {
  text_bonus: "textBonus",
  text_deposit: "textDeposit",
};

export const playerWalletSelector = createSelector(
  player,
  prop("wallet")
);

export const playerWalletAmountSelector = createSelector(
  playerWalletSelector,
  prop("amount")
);

export const playerWalletBonusSelector = createSelector(
  playerWalletSelector,
  propOr("", "bonus")
);

export const playerWalletCurrencySelector = createSelector(
  playerWalletSelector,
  prop("iso4217CurrencyCode")
);

export const playerCurrencySelector = createSelector(
  playerWalletCurrencySelector,
  currencySelector,
  (walletCurrency, handsakeCurrency) => {
    return walletCurrency || handsakeCurrency;
  }
);

export const mapPaymentTranslations = pipe(
  map(({ key, value }) => [keyPayments[key] || key, value]),
  fromPairs
);

export const playerPaymentsTextsSelector = createSelector(
  getField({
    slug: SLUGS.PAYMENTS,
    field: "text_fields",
    defaultValue: [],
  }),
  mapPaymentTranslations
);

export const playerBonusTextSelector = createSelector(
  playerPaymentsTextsSelector,
  prop("textBonus")
);

export const playerBalanceAmountSelector = createSelector(
  playerWalletAmountSelector,
  walletAmountSelector,
  (walletAmount, handsakeAmount) => {
    return walletAmount || handsakeAmount;
  }
);
