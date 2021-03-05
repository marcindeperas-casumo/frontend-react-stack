import { useQuery } from "@apollo/client";
import * as React from "react";
import * as A from "Types/apollo";
import { VirtualGrid, VirtualGridSkeleton } from "Components/VirtualGrid";
import { LiveCasinoCard } from "Components/LiveCasinoCard/LiveCasinoCard";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { LiveCasinoDetailPageDesktopQuery } from "./LiveCasinoDetailPage.graphql";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="t-background-white">
    <div className="o-wrapper u-padding-y--2xlg">{children}</div>
  </div>
);

const tileProps = {
  tileWidth: 330,
  tileHeight: 299,
  spacerSize: "default",
};

export const LiveCasinoDetailPageDesktop = () => {
  const { data, loading } = useQuery<
    A.LiveCasinoDetailPageDesktopQuery,
    A.LiveCasinoDetailPageDesktopQueryVariables
  >(LiveCasinoDetailPageDesktopQuery);

  const { t, loading: loadingTranslations } = useTranslationsGql({
    betBehindText: "root:mobile.live-casino-cards-content:fields.bet_behind",
    openSeatsText: "root:mobile.live-casino-cards-content:fields.open_seats",
    playNowText: "root:mobile.live-casino-cards-content:fields.play_now",
  });

  if (loading || loadingTranslations) {
    return (
      <Wrapper>
        <VirtualGridSkeleton {...tileProps} />
      </Wrapper>
    );
  }

  if (!data || !data.gamesList) {
    return null;
  }

  const games = data.gamesList.games;

  return (
    <Wrapper>
      <VirtualGrid
        {...tileProps}
        dataList={games}
        numberOfEntries={games.length}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        TileComponent={game => <LiveCasinoCard game={game} t={t} />}
      />
    </Wrapper>
  );
};
