// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { launchGame } from "Services/LaunchGameService";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
  playNowText: string,
};

export const LiveCasinoCardContainer = ({ game, playNowText }: Props) => {
  return game.liveCasinoLobby ? (
    <LiveCasinoCard
      game={game}
      playNowText={playNowText}
      onLaunchGame={() => launchGame({ slug: game?.slug })}
    />
  ) : null;
};
