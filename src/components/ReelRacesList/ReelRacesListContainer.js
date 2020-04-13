// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

// Polling for updates is temporary.
// We are going to move to use subscriptions once the GraphQL server is ready for it
const pollInterval = 8000;

export const ReelRacesListContainer = () => {
  const { data, loading } = useQuery<
    A.ReelRaceListQuery,
    A.ReelRaceListQueryVariables
  >(ReelRaceListQuery, {
    variables: {
      limit: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
    },
    pollInterval,
  });

  const { t, loading: cmsLoading } = useTranslationsGql({
    title: "root:reel-races.reel-race-templates:fields.title",
    seeMore: "root:built-pages.top-lists-translations:fields.more_link",
  });

  if (loading || cmsLoading) {
    // We need a beaut skeleton!
    return null;
  }

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return (
      <ReelRacesList
        reelRaces={reelRaces}
        title={t.title}
        seeMore={t.seeMore}
      />
    );
  }

  return null;
};
