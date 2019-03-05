// @flow
import { connect } from "react-redux";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
} from "Models/gameProviders";
import { gameProvidersListSelector } from "Models/categories";

type Props = {
  Component: Function,
  props: Object,
};

export const withGameProviderProps = ({ Component, props }: Props) =>
  connect(
    (state, { ...ownProps }) => ({
      ...ownProps,
      isLoaded: areGameProvidersLoaded(state),
      items: gameProvidersListSelector(state),
    }),
    dispatch => ({ fetch: () => dispatch(fetchGameProviders()) }),
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      ...props,
    })
  )(Component);
