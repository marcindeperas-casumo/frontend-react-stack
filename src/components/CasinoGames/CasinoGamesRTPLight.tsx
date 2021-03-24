import { useQuery } from "@apollo/client";
import * as React from "react";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { useFetchMore } from "./hooks/useFetchMore";
import { GetGamesRTPLight } from "./GetGamesRTPLight.graphql";
import { RtpTable } from "./RtpTable/RtpTable";
import { gameListRTPLimit } from "./Constants";

export const CasinoGamesRTPLight = () => {
  const [offset, setOffset] = React.useState(0);
  const t = useTranslations<{
    rtp_game_name: string;
    rtp_value: string;
  }>("game-categories");

  const query = "categories=SLOT_MACHINE";
  const { data, loading, fetchMore } = useQuery<
    A.GetGamesRtpQuery,
    A.GetGamesRtpQueryVariables
  >(GetGamesRTPLight, {
    variables: {
      query,
      offset,
      limit: gameListRTPLimit,
    },
  });

  const fetchMoreRows = useFetchMore({ fetchMore, setOffset, offset });

  if (loading || !data || !data.getGamesPaginated) {
    return null;
  }

  const { games, gamesCount } = data.getGamesPaginated;

  return (
    t && (
      <RtpTable
        games={games}
        fetchMore={fetchMoreRows}
        fullGamesCount={gamesCount}
        headerColumns={[t.rtp_game_name, t.rtp_value]}
        valuesColumns={["rtp"]}
      />
    )
  );
};
