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

  const validReelRaces =
    data &&
    data.reelRaces.filter(reelRace => {
      const reelRaceStartedPlayerNotOptedIn =
        timeRemainingBeforeStart(reelRace.startTime) <= 0 && !reelRace.optedIn;

      return !R.isEmpty(reelRace.game) && !reelRaceStartedPlayerNotOptedIn;
    });

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
