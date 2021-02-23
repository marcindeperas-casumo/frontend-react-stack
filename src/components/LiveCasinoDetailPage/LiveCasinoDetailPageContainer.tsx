// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './LiveCasinoDetailPage.graphql... Remove this comment to see the full error message
import { LiveCasinoDetailPageQuery } from "./LiveCasinoDetailPage.graphql";
import { LiveCasinoDetailPage } from "./LiveCasinoDetailPage";

export const LiveCasinoDetailPageContainer = () => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
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
