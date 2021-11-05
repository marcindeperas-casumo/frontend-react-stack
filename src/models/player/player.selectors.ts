import { createSelector } from "reselect";
import { propOr, prop, map, fromPairs, pipe } from "ramda";
import { getField } from "Models/cms";
import {
  walletAmountSelector,
  bonusAmountSelector,
  currencySelector,
} from "Models/handshake";
import { getSymbolForCurrency } from "Utils";
import { TCurrencyCode } from "Src/constants";

const player = state => state.player;

const keyPayments = {
  text_bonus: "textBonus",
  text_deposit: "textDeposit",
};

export const playerWalletSelector = createSelector(player, prop("wallet"));
export const playerNetFinancialPositionSelector = createSelector(
  player,
  prop("financialPosition")
);

export const playerWalletAmountSelector = createSelector<any, any, number>(
  playerWalletSelector,
  propOr(null, "amount")
);

export const playerCurrencySymbolSelector = createSelector(
  [currencySelector],
  currency => getSymbolForCurrency({ currency })
);

// Todo: Investigate https://jira.casumocave.com/browse/FC-91 Bonus balance deduction on staging when wagering
export const playerWalletBonusSelector = createSelector<
  any,
  any,
  number,
  number
>(playerWalletSelector, bonusAmountSelector, (wallet, handshakeBonusAmount) => {
  const validateBonusBalanceToReturn = propOr(handshakeBonusAmount, "bonus");
  return validateBonusBalanceToReturn(wallet);
});

export const playerWalletCurrencySelector = createSelector(
  playerWalletSelector,
  prop("iso4217CurrencyCode")
);

export const playerCurrencySelector = createSelector(
  playerWalletCurrencySelector,
  currencySelector,
  (walletCurrency: TCurrencyCode, handsakeCurrency: TCurrencyCode) => {
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

export const playerBonusTextSelector = createSelector<any, any, string>(
  playerPaymentsTextsSelector,
  prop("textBonus")
);

export const playerBalanceAmountSelector = createSelector<
  any,
  number,
  number,
  number,
  number
>(
  playerWalletAmountSelector,
  walletAmountSelector,
  bonusAmountSelector,
  (walletAmount, handshakeWalletAmount, handshakeBonusAmount) => {
    return walletAmount !== null
      ? walletAmount
      : handshakeWalletAmount - handshakeBonusAmount;
  }
);

export const playerBalanceUpdateReasonSelector = createSelector(
  playerWalletSelector,
  propOr(null, "lastBalanceUpdateReason")
);

export const playerNetWinningsUpdateSelector = createSelector(
  playerNetFinancialPositionSelector,
  propOr(null, "sessionWinnings")
);

export const playerNetLossesUpdateSelector = createSelector(
  playerNetFinancialPositionSelector,
  propOr(null, "sessionLoss")
);

export const playerSessionIsValidSelector = createSelector(
  player,
  prop("sessionValid")
);

export const playerSessionStarted = createSelector<any, any, number>(
  player,
  prop("sessionStartedTime")
);

export const playerLogoutStartedSelector = createSelector(
  player,
  prop("logoutStarted")
);
