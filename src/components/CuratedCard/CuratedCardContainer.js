// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import type { Props } from "Components/CuratedCard/CuratedCard";
import { fetchCurated, curatedSelector } from "Reducers/curated";

const connector: Connector<Props> = connect(
  state => ({
    data: curatedSelector()(state),
  }),
  dispatch => ({
    fetchCurated: () => dispatch(fetchCurated()),
  })
);

export default connector(CuratedCard);
