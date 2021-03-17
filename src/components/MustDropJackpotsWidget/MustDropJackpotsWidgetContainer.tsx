import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { POLL_INTERVAL } from "Src/constants";
import { MustDropJackpotsWidget } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import { MustDropJackpotsWidgetSkeleton } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidgetSkeleton";
import { MustDropJackpotsQuery } from "./MustDropJackpotsWidgetContainer.graphql";

const MustDropJackpotsWidgetContainer = () => {
  const { data, loading } = useQuery<
    A.MustDropJackpotsQuery,
    A.MustDropJackpotsQueryVariables
  >(MustDropJackpotsQuery, {
    pollInterval: POLL_INTERVAL.JACKPOTS_MUST_DROP,
    fetchPolicy: "network-only", // showing old jackpots (from previous session) could be bad for compliance
  });
  if (data && data.mustDropJackpots) {
    return <MustDropJackpotsWidget jackpots={data.mustDropJackpots} />;
  }
  if (loading) {
    return <MustDropJackpotsWidgetSkeleton />;
  }

  return null;
};

export default MustDropJackpotsWidgetContainer;
