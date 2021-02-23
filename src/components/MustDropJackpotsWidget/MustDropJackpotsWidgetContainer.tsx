// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { POLL_INTERVAL } from "Src/constants";
import { MustDropJackpotsWidget } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import { MustDropJackpotsWidgetSkeleton } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidgetSkeleton";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MustDropJackpotsWidgetContai... Remove this comment to see the full error message
import { MustDropJackpotsQuery } from "./MustDropJackpotsWidgetContainer.graphql";

const MustDropJackpotsWidgetContainer = () => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
  const { data, loading } = useQuery<A.MustDropJackpotsQuery, _>(
    MustDropJackpotsQuery,
    {
      pollInterval: POLL_INTERVAL.JACKPOTS_MUST_DROP,
      fetchPolicy: "network-only", // showing old jackpots (from previous session) could be bad for compliance
    }
  );
  if (data && data.mustDropJackpots) {
    return <MustDropJackpotsWidget jackpots={data.mustDropJackpots} />;
  }
  if (loading) {
    return <MustDropJackpotsWidgetSkeleton />;
  }

  return null;
};

export default MustDropJackpotsWidgetContainer;
