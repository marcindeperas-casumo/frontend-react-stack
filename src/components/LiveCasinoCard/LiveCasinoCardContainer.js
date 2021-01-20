// @flow
import React from "react";
import { LiveCasinoCard } from "Components/LiveCasinoCard/LiveCasinoCard";
import { useTranslations } from "Utils/hooks";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
};

export const LiveCasinoCardContainer = ({ game }: Props) => {
  const t = useTranslations<{
    bet_behind: string,
    open_seats: string,
    play_now: string,
  }>("mobile.live-casino-cards-content");

  if (!t) {
    return null;
  }

  return <LiveCasinoCard t={t} game={game} />;
};
