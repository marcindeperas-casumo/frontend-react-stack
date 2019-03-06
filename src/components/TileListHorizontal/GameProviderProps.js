// @flow
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
} from "Models/gameProviders";
import { gameProvidersListSelector } from "Models/categories";

export default connect(
  createStructuredSelector({
    isLoaded: areGameProvidersLoaded,
    items: gameProvidersListSelector,
  }),
  { fetch: fetchGameProviders }
);
