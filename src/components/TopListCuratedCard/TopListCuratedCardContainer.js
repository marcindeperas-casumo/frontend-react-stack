// @flow
import { connect } from "react-redux";
import { hasMadeFirstDepositSelector } from "Models/handshake";
import { TopListCuratedCard } from "./TopListCuratedCard";

export const TopListCuratedCardContainer = connect(state => ({
  hasDeposited: hasMadeFirstDepositSelector(state),
}))(TopListCuratedCard);
