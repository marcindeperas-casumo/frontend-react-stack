// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
  POLL_INTERVAL,
} from "Src/constants";
import * as A from "Types/apollo";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

export const ReelRacesListContainer = () => {
  const { data, loading } = useQuery<
    A.ReelRaceListQuery,
    A.ReelRaceListQueryVariables
  >(ReelRaceListQuery, {
    variables: {
      limit: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
    },
    pollInterval: POLL_INTERVAL.REEL_RACES,
  });

  if (loading) {
    // We need a beaut skeleton!
    return null;
  }

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return (
      <ReelRacesList
        reelRaces={reelRaces}
        title={data.title}
        seeMore={data.seeMore}
      />
    );
  }

  return null;
};
