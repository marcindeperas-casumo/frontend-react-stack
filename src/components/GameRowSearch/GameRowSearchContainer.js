// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { GameRowSearch } from "Components/GameRowSearch/GameRowSearch";

const GameRowSearchConnected = connect(
  (state, { slug }) => ({
    game: gameSelector(slug)(state),
  }),
  (dispatch, { slug }) => ({
    onLaunchGame: () => dispatch(launchGame(slug)),
  })
)(GameRowSearch);

type Props = {
  /** The slug of the game to render */
  slug: string,
  /** The search query */
  query?: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
};

export const GameRowSearchContainer = ({
  slug,
  query,
  highlightSearchQuery,
}: Props) => (
  <GameRowSearchConnected
    slug={slug}
    query={query}
    highlightSearchQuery={highlightSearchQuery}
  />
);
