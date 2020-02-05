// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
};

// __FIX__: rename "id" to "item" here and add types
export const LiveCasinoCardContainer = ({ game }: Props) => {
  // __FIX__: connect the rest of the props to the Apollo stack as well
  return game.liveCasinoLobby ? (
    <LiveCasinoCard game={game} launchGame={() => {}} />
  ) : null;
};
