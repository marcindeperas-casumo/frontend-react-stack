// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
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

  if (data && data.reelRaces && data.reelRaces.length) {
    return (
      <ReelRacesList
        reelRaces={data.reelRaces}
        title={data.title}
        seeMore={data.seeMore}
      />
    );
  }

  return null;
};
