// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

// Polling for updates is temporary.
// We are going to move to use subscriptions once the GraphQL server is ready for it
const pollInterval = 3000;

export const ReelRacesListContainer = () => {
  const { data, loading } = useQuery<A.ReelRaceListQuery, _>(
    ReelRaceListQuery,
    {
      pollInterval,
    }
  );

  return (
    <ReelRacesList
      isFetched={!loading}
      areTranslationsFetched={!loading}
      reelRaces={data?.reelRaces}
      // same
      title={data?.title}
    />
  );
};
