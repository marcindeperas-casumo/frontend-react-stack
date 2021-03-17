import { useIntersection } from "react-use";
import { useQuery } from "@apollo/client";
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import * as A from "Types/apollo";
import { LiveCasinoCardSmallDataQuery } from "./LiveCasinoCardSmall.graphql";
import { LiveCasinoCardSmall } from "./LiveCasinoCardSmall";

type Props = {
  game: A.GameTile_GameFragment;
};

export const LiveCasinoCardSmallContainer = ({ game }: Props) => {
  const t = useTranslations<{
    bet_behind: string;
    open_seats: string;
    play_now: string;
    opens_at: string;
    table_closed: string;
  }>("mobile.live-casino-cards-content");
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
