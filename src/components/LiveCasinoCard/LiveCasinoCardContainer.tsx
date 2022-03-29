import React from "react";
import { LiveCasinoCard } from "Components/LiveCasinoCard/LiveCasinoCard";
import { useTranslations } from "Utils/hooks";
import * as A from "Types/apollo";

type Props = {
  game: A.GameListLiveCasinoQuery["gamesList"]["games"][number];
};

export type TLiveCasinoCardContent = {
  bet_behind: string;
  open_seats: string;
  play_now: string;
  table_temporarily_unavailable: string;
  table_unavailable: string;
  opens_at: string;
  provider_logos: Array<{
    provider_name: string;
    logo: string;
  }>;
};

export const LiveCasinoCardContainer = ({ game }: Props) => {
  const t = useTranslations<TLiveCasinoCardContent>(
    "mobile.live-casino-cards-content"
  );

  return <LiveCasinoCard t={t} game={game} />;
};
