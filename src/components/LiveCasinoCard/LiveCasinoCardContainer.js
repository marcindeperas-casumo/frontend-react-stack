// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { launchGame } from "Services/LaunchGameService";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
};

export const LiveCasinoCardContainer = ({ game }: Props) => {
  return game.liveCasinoLobby ? (
    <LiveCasinoCard
      game={game}
      onLaunchGame={() => launchGame({ slug: game?.slug })}
    />
  ) : null;
};
