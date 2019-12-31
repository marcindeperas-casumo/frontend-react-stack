import { connect } from "react-redux";
import { COMPLIANCE_STATE_PROPERTY } from "Src/constants";
import { complianceStatePropertySelector } from "Models/handshake";
import { playerCurrencySymbolSelector } from "Models/player";
import { SetAmount } from "./SetAmount";

export const SetAmountContainer = connect(state => ({
  DGAComplianceState: complianceStatePropertySelector(
    COMPLIANCE_STATE_PROPERTY.DGA
  )(state),
  currencySymbol: playerCurrencySymbolSelector(state),
}))(SetAmount);
