// @flow
import React from "react";
import { LiveCasinoCard } from "Components/LiveCasinoCard/LiveCasinoCard";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
};

export const LiveCasinoCardContainer = ({ game }: Props) => {
  const { t, loading } = useTranslationsGql({
    betBehindText: "root:mobile.live-casino-cards-content:fields.bet_behind",
    openSeatsText: "root:mobile.live-casino-cards-content:fields.open_seats",
    playNowText: "root:mobile.live-casino-cards-content:fields.play_now",
  });

  if (loading) {
    return null;
  }

  return game.liveCasinoLobby ? <LiveCasinoCard t={t} game={game} /> : null;
};
