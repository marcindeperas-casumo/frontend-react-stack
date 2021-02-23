// @flow
import { connect } from "react-redux";
import { realityCheckSelector } from "Models/playOkay/realityCheck";
import {
  playerCasumoNameSelector,
  localeSelector,
  currencySelector,
} from "Models/handshake";
import { RealityCheck } from "./RealityCheck";

export const RealityCheckContainer = connect(state => ({
  locale: localeSelector(state),
  currency: currencySelector(state),
  casumoName: playerCasumoNameSelector(state),
  realityCheck: realityCheckSelector(state),
}))(RealityCheck);
