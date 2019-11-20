// @flow
import { connect } from "react-redux";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
} from "Models/gameProviders";
import { gameProvidersListSelector } from "Models/categories";

export default connect(
  state => ({
    isLoaded: areGameProvidersLoaded(state),
    items: gameProvidersListSelector(state),
  }),
  dispatch => ({
    fetch: () => dispatch(fetchGameProviders()),
  })
);
