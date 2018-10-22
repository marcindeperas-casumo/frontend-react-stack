// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard";
import type { Props } from "Components/CuratedCard";
import { fetchPage, isPageLoadedFactory } from "Reducers/curated";

const connector: Connector<Props> = connect(
  state => ({
    isFetched: isPageLoadedFactory()(state),
  }),
  dispatch => ({
    startFetch: () => dispatch(fetchPage()),
  })
);

export default connector(CuratedCard);
