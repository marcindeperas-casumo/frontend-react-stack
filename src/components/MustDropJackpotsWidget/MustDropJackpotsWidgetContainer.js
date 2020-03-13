// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { MustDropJackpotsWidget } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import { MustDropJackpotsWidgetSkeleton } from "Components/MustDropJackpotsWidget/MustDropJackpotsWidgetSkeleton";
import { MustDropJackpotsQuery } from "./MustDropJackpotsWidgetContainer.graphql";

const pollInterval = 30000;

const MustDropJackpotsWidgetContainer = () => {
  const { data, loading } = useQuery<A.MustDropJackpotsQuery, null>(
    MustDropJackpotsQuery,
    { pollInterval }
  );
  if (loading) {
    return <MustDropJackpotsWidgetSkeleton />;
  }
  if (data && data.mustDropJackpots) {
    return <MustDropJackpotsWidget jackpots={data.mustDropJackpots} />;
  }

  return null;
};

export default MustDropJackpotsWidgetContainer;
