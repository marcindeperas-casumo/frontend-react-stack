// @flow
import React from "react";
import { connect } from "react-redux";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
} from "Models/gameProviders";
import { gameProvidersListSelector } from "Models/categories";
import GameProvidersList from "Components/GameProvidersList/GameProvidersList";
import { types } from "./GameProvidersList.constants";

type Props = {
  /** Type of list (e.g, game-providers) */
  type: string,
  title: string,
};

const GameProvidersListConnected = connect(
  state => ({
    isLoaded: areGameProvidersLoaded(state),
    items: gameProvidersListSelector(state),
  }),
  dispatch => ({
    fetch: () => dispatch(fetchGameProviders()),
  })
)(GameProvidersList);

const GameProvidersListContainer = (props: Props) => {
  if (props.type === types.GAME_PROVIDERS) {
    return <GameProvidersListConnected title={props.title} />;
  }
  return <GameProvidersList title={props.title} />;
};

export default GameProvidersListContainer;
