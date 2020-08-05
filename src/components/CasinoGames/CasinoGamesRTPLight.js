// @flow
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { GetGamesRTPLight } from "./GetGamesRTPLight.graphql";
import { RtpTable } from "./RtpTable/RtpTable";

export const CasinoGamesRTPLight = () => {
  const t = useTranslations<{
    rtp_game_name: string,
    rtp_value: string,
  }>("game-categories");

  const categoriesContent = useTranslations("game-categories", true);
  const query = "categories=SLOT_MACHINE";
  const { data, loading, fetchMore } = useQuery<
    A.GetGamesRTP,
    A.GetGamesRTPVariables
  >(GetGamesRTPLight, {
    variables: {
      query,
      offset: 0,
      limit: 48,
    },
  });

  if (loading || !data || !data.getGamesPaginated || !categoriesContent) {
    return null;
  }

  const { games, gamesCount } = data.getGamesPaginated;

  return (
    t && (
      <RtpTable
        games={games}
        data={data}
        fetchMore={fetchMore}
        query={query}
        gamesCount={gamesCount}
        scrollElementId={ROOT_SCROLL_ELEMENT_ID}
        headerColumns={[t.rtp_game_name, t.rtp_value]}
        valuesColumns={["rtp"]}
      />
    )
  );
};
