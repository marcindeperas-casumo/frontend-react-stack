
// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { CasinoGames } from "./CasinoGames";
import { GetGamesRTP } from "./GetGamesRTP.graphql";

export const CasinoGamesContainer = () => {
  const [retrievedRTPGames, setRetrievedRTPGames] = React.useState([]);
  const t = useTranslations<{
    meta_description: string,
    meta_title: string,
    rtp_description: string,
    rtp_game_name: string,
    rtp_game_provider: string,
    rtp_loading: string,
    rtp_value: string,
    actual_rtp_past_6_months: string,
    actual_rtp_past_year: string,
  }>("game-categories");
  const categoriesContent = useTranslations("game-categories", true);
  const query = "categories=SLOT_MACHINE";

  const { data, loading, fetchMore } = useQuery<
    A.GetGamesRTP,
    A.GetGamesRTPVariables
  >(GetGamesRTP, {
    variables: {
      query,
      offset: 0,
      limit: 48,
    },
  });

  const fetchMoreRows = ({ offset }) => {
    return fetchMore<A.GetGamesRTPVariables>({
      variables: {
        query: "categories=SLOT_MACHINE",
        offset: offset,
        limit: 50,
      },
    });
  };

  if (!data) {
    return null;
  }

  return (
    <CasinoGames
      categoriesContent={categoriesContent}
      t={t}
      data={data}
      loading={loading}
      fetchMore={fetchMoreRows}
    />
  );
};
