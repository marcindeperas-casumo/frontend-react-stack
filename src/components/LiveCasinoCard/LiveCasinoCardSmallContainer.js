// @flow
import * as React from "react";
import { useIntersection } from "react-use";
import { useQuery } from "@apollo/react-hooks";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import * as A from "Types/apollo";
import { LiveCasinoCardSmallDataQuery } from "./LiveCasinoCardSmall.graphql";
import { LiveCasinoCardSmall } from "./LiveCasinoCardSmall";

type Props = {
  game: A.GameTile_Game,
};

export const LiveCasinoCardSmallContainer = ({ game }: Props) => {
  const { t } = useTranslationsGql({
    betBehindText: "root:mobile.live-casino-cards-content:fields.bet_behind",
    openSeatsText: "root:mobile.live-casino-cards-content:fields.open_seats",
    playNowText: "root:mobile.live-casino-cards-content:fields.play_now",
    opensAtText: "root:mobile.live-casino-cards-content:fields.opens_at",
    tableClosedText: "root:mobile.live-casino-cards-content:fields.closed",
  });
  const intersectionRef = React.useRef(null);
  const observerEntry = useIntersection(intersectionRef, {
    threshold: 0.1,
  });
  const { data } = useQuery<
    A.LiveCasinoCardSmallDataQuery,
    A.LiveCasinoCardSmallDataQueryVariables
  >(LiveCasinoCardSmallDataQuery, {
    variables: {
      id: game?.liveCasinoId || "",
    },
    pollInterval: observerEntry?.isIntersecting ? 2000 : 0,
  });

  return (
    <div ref={intersectionRef}>
      <LiveCasinoCardSmall
        t={t}
        game={game}
        liveCasinoTable={data?.liveCasinoTablesById}
      />
    </div>
  );
};
