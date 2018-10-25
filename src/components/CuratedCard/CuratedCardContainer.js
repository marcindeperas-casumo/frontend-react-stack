// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import type { Props } from "Components/CuratedCard/CuratedCard";
import { types, fetchCurated, curatedSelector } from "Reducers/curated";
import { isPageLoadedFactory } from "Reducers/cms";

const connector: Connector<Props> = connect(
  state => ({
    data: curatedSelector()(state),
    isFetched: isPageLoadedFactory(types.CURATED_SLUG)(state),
  }),
  dispatch => ({
    fetchCurated: () => dispatch(fetchCurated()),
  })
);

export default connector(CuratedCard);
