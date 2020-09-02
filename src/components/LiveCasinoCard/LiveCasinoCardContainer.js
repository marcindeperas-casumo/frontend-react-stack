// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { launchGame } from "Services/LaunchGameService";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
  playNowText: string,
};

export const LiveCasinoCardContainer = ({ game, playNowText }: Props) => {
  const { t, loading } = useTranslationsGql({
    betBehindText: "root:mobile.live-casino-cards-content:fields.bet_behind",
    openSeatsText: "root:mobile.live-casino-cards-content:fields.open_seats",
  });

  if (loading) {
    return null;
  }

  return game.liveCasinoLobby ? (
    <LiveCasinoCard
      t={t}
      game={game}
      playNowText={playNowText}
      onLaunchGame={() => launchGame({ slug: game?.slug })}
    />
  ) : null;
};
