// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { navigateById } from "Services/NavigationService";
import { GameDetailsQuery } from "./GameDetails.graphql";
import { GameDetailsSkeleton } from "./GameDetailsSkeleton";
import { GameDetails } from "./GameDetails";

export const GameDetailsContainer = ({ slug }: { slug: string }) => {
  const { loading, data } = useQuery<
    A.GameDetailsQuery,
    A.GameDetailsQueryVariables
  >(GameDetailsQuery, {
    variables: { slug },
  });

  if (loading) {
    return <GameDetailsSkeleton />;
  }

  if (!loading && data && !data.game) {
    navigateById({ routeId: "404" });
  }

  if (!loading && data && data.game) {
    return <GameDetails data={data} />;
  }

  return null;
};
