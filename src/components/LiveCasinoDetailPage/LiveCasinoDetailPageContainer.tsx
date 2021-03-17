import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { LiveCasinoDetailPageQuery } from "./LiveCasinoDetailPage.graphql";
import { LiveCasinoDetailPage } from "./LiveCasinoDetailPage";

export const LiveCasinoDetailPageContainer = () => {
  const { data, loading } = useQuery<
    A.LiveCasinoDetailPageQuery,
    A.LiveCasinoDetailPageQueryVariables
  >(LiveCasinoDetailPageQuery);
  const groupedLiveCasinoGames = data?.groupedLiveCasinoGames || [];

  if (loading) {
    return null;
  }

  return (
    <LiveCasinoDetailPage groupedLiveCasinoGames={groupedLiveCasinoGames} />
  );
};
