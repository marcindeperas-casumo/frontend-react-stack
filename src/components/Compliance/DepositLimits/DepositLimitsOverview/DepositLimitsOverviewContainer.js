// @flow
import { connect } from "react-redux";
import {
  getDepositLimitsForOverviewScreenSelector,
  getCurrencyAndLocaleSelector,
  getPendingLimitChangesSelector,
  canIncreaseLimitsSelector,
} from "Models/playOkay/depositLimits";
import { DepositLimitsOverview } from "./DepositLimitsOverview";

export const DepositLimitsOverviewContainer = connect(state => ({
  ...getCurrencyAndLocaleSelector(state),
  ...getPendingLimitChangesSelector(state),
  canIncreaseLimits: canIncreaseLimitsSelector(state),
  limits: getDepositLimitsForOverviewScreenSelector(state),
}))(DepositLimitsOverview);
