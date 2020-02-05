// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
};

export const LiveCasinoCardContainer = ({ game }: Props) => {
  // __FIX__: connect the rest of the props to the Apollo stack as well
  return game.liveCasinoLobby ? (
    <LiveCasinoCard game={game} launchGame={() => {}} />
  ) : null;
};
