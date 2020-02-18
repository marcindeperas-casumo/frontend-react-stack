// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as R from "ramda";
import { timeRemainingBeforeStart } from "Src/utils";
import * as A from "Types/apollo";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

// Polling for updates is temporary.
// We are going to move to use subscriptions once the GraphQL server is ready for it
const pollInterval = 8000;

export const getValidReelRaces = (
  reelRaces: Array<A.ReelRaceListQuery_reelRaces>
): Array<A.ReelRaceListQuery_reelRaces> =>
  reelRaces.filter(
    ({ game, startTime, optedIn }) =>
      !R.isEmpty(game) && (optedIn || timeRemainingBeforeStart(startTime) > 0)
  );

export const ReelRacesListContainer = () => {
  const { data, loading } = useQuery<A.ReelRaceListQuery, _>(
    ReelRaceListQuery,
    {
      pollInterval,
    }
  );

  if (loading) {
    // We need a beaut skeleton!
    return null;
  }

  const reelRaces = data?.reelRaces || [];
  const validReelRaces = getValidReelRaces(reelRaces);

  if (data && validReelRaces && validReelRaces.length) {
    return (
      <ReelRacesList
        reelRaces={validReelRaces}
        title={data.title}
        seeMore={data.seeMore}
      />
    );
  }

  return null;
};
