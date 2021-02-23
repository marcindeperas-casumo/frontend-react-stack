// @flow
import { connect } from "react-redux";
import { hasMadeFirstDepositSelector } from "Models/handshake";
import { SportsCuratedCard } from "./SportsCuratedCard";

export const SportsCuratedCardContainer = connect(state => ({
  hasDeposited: hasMadeFirstDepositSelector(state),
}))(SportsCuratedCard);
