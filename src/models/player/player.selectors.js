// @flow
import { createSelector } from "reselect";
import { propOr, prop, map, fromPairs, pipe } from "ramda";
import { getField } from "Models/cms";
import {
  walletAmountSelector,
  bonusAmountSelector,
  currencySelector,
  localeSelector,
} from "Models/handshake";
import { getSymbolForCurrency } from "Utils";

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
  propOr(0, "amount")
);

export const playerCurrencySymbolSelector = createSelector(
  [currencySelector, localeSelector],
  (currency, locale) => getSymbolForCurrency({ locale, currency })
);

// Todo: Investigate https://jira.casumocave.com/browse/FC-91 Bonus balance deduction on staging when wagering
export const playerWalletBonusSelector = createSelector(
  playerWalletSelector,
  bonusAmountSelector,
  (wallet, handshakeBonusAmount) => {
    return prop("bonus")(wallet) || handshakeBonusAmount;
  }
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
    slug: "features.payments",
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
  bonusAmountSelector,
  (walletAmount, handshakeWalletAmount, handshakeBonusAmount) => {
    return walletAmount || handshakeWalletAmount - handshakeBonusAmount;
  }
);

export const playerSessionIsValidSelector: any => boolean = createSelector(
  player,
  prop("sessionValid")
);

export const playerLogoutStartedSelector: any => boolean = createSelector(
  player,
  prop("logoutStarted")
);
