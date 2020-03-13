import { connect } from "react-redux";
import { COMPLIANCE_STATE_PROPERTY } from "Src/constants";
import {
  complianceStatePropertySelector,
  localeSelector,
  currencySelector,
} from "Models/handshake";
import { SetAmount } from "./SetAmount";

export const SetAmountContainer = connect(state => ({
  DGAComplianceState: complianceStatePropertySelector(
    COMPLIANCE_STATE_PROPERTY.DGA
  )(state),
  locale: localeSelector(state),
  currency: currencySelector(state),
}))(SetAmount);
