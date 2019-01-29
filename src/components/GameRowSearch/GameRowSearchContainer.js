// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { gameSearchQuerySelector } from "Models/gameSearch";
import GameRowSearch from "Components/GameRowSearch/GameRowSearch";

const GameRowSearchConnected = connect(
  (state, { slug }) => ({
    game: gameSelector(slug)(state),
    query: gameSearchQuerySelector(state),
  }),
  (dispatch, { slug }) => ({
    onLaunchGame: () => dispatch(launchGame(slug)),
  })
)(GameRowSearch);

type Props = {
  /** The slug of the game to render */
  slug: string,
};

const GameRowSearchContainer = ({ slug }: Props) => (
  <GameRowSearchConnected slug={slug} />
);

export default GameRowSearchContainer;
