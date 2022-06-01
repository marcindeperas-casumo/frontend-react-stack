import { connect } from "react-redux";
import {
  getDepositLimitsForOverviewScreenSelector,
  getCurrencyAndLocaleSelector,
  getPendingLimitChangesSelector,
  revocationAllowedSelector,
} from "Models/playOkay/dgojDepositLimits";
import { DepositLimitsOverview } from "./DepositLimitsOverview";

export const DepositLimitsOverviewContainer = connect(state => ({
  ...getCurrencyAndLocaleSelector(state),
  ...getPendingLimitChangesSelector(state),
  revocationAllowed: revocationAllowedSelector(state),
  limits: getDepositLimitsForOverviewScreenSelector(state),
}))(DepositLimitsOverview);
