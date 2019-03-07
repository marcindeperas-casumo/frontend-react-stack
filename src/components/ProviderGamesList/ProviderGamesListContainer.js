// @flow
import React from "react";
import { connect } from "react-redux";
import ProviderGamesList from "Components/ProviderGamesList/ProviderGamesList";
import { fetchGamesByProvider } from "Models/games";
import {
  gameProviderBySlug,
  areProviderGamesLoaded,
  types,
} from "Models/gameProviders";
import { isFetchError } from "Models/fetch";

type Props = {
  /** Provider slug whose games will be fetched */
  provider: string,
};

const ProviderGamesListConnected = connect(
  (state, { provider }) => ({
    isLoaded: areProviderGamesLoaded(provider)(state),
    provider: gameProviderBySlug(provider)(state),
    error: isFetchError(types.GET_GAME_PROVIDER_ERROR)(state),
  }),
  (dispatch, { provider }) => ({
    fetchGames: () => dispatch(fetchGamesByProvider(provider)),
  })
)(ProviderGamesList);

const ProviderGamesListContainer = (props: Props) => (
  <ProviderGamesListConnected {...props} />
);

export default ProviderGamesListContainer;
