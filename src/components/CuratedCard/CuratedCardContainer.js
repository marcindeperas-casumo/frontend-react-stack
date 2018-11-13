// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import type { Props } from "Components/CuratedCard/CuratedCard";
import {
  getCuratedByMarketSlug,
  curatedSelector,
  fetchCurated,
} from "Reducers/curated";
import { isPageLoadedFactory } from "Reducers/cms";
import { market as marketSelector } from "Reducers/handshake/selectors";
import { actions as gameActions } from "Reducers/games";

const connector: Connector<Props> = connect(
  state => {
    const slug = getCuratedByMarketSlug(marketSelector(state));
    return {
      ...curatedSelector(slug)(state),
      isFetched: isPageLoadedFactory(slug)(state),
    };
  },
  dispatch => ({
    fetchCurated: () => dispatch(fetchCurated()),
    dispatchLaunchGame: id => dispatch(gameActions.launchGame(id)),
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { game } = stateProps;
    return {
      ...stateProps,
      ...dispatchProps,
      onLaunchGame: () => dispatchProps.dispatchLaunchGame(game),
    };
  }
);

export default connector(CuratedCard);
