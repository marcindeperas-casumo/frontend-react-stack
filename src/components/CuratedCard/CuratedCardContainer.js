// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import type { Props } from "Components/CuratedCard/CuratedCard";
import { curatedSelector } from "Reducers/curated";

const connector: Connector<Props> = connect(state => ({
  data: curatedSelector()(state),
}));

export default connector(CuratedCard);
