// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { LiveCasinoDetailPageQuery } from "./LiveCasinoDetailPage.graphql";
import { LiveCasinoDetailPage } from "./LiveCasinoDetailPage";

export const LiveCasinoDetailPageContainer = () => {
  const { data, loading } = useQuery<A.LiveCasinoDetailPageQuery, _>(
    LiveCasinoDetailPageQuery
  );
  const groupedLiveCasinoGames = data?.groupedLiveCasinoGames || [];

  if (loading) {
    return null;
  }

  return (
    <LiveCasinoDetailPage groupedLiveCasinoGames={groupedLiveCasinoGames} />
  );
};
