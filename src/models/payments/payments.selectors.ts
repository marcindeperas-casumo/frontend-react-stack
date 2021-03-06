import { createSelector } from "reselect";
import { prop } from "ramda";

export const getPaymentsSelector = prop("playerPayments");

export const getSelectedQuickDepositMethod = createSelector(
  getPaymentsSelector,
  prop("selectedQuickDepositMethod")
);

export const getPaymentRequestSelector = createSelector(
  getPaymentsSelector,
  prop("paymentRequest")
);
