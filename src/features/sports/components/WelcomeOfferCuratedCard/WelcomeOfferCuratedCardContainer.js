// @flow
import { connect } from "react-redux";
import {
  hasMadeFirstDepositSelector,
  verticalSelector,
} from "Models/handshake";
import { WelcomeOfferCuratedCard } from "./WelcomeOfferCuratedCard";

export const WelcomeOfferCuratedCardContainer = connect(state => ({
  vertical: verticalSelector(state),
  hasDeposited: hasMadeFirstDepositSelector(state),
}))(WelcomeOfferCuratedCard);
