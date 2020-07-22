// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
  POLL_INTERVAL,
} from "Src/constants";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

export const ReelRacesListContainer = () => {
  const { data } = useQuery<A.ReelRaceListQuery, A.ReelRaceListQueryVariables>(
    ReelRaceListQuery,
    {
      variables: {
        limit: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
      },
      pollInterval: POLL_INTERVAL.REEL_RACES,
    }
  );

  const { t } = useTranslationsGql({
    title: "root:reel-races.reel-race-templates:fields.title",
    seeMore: "root:built-pages.top-lists-translations:fields.more_link",
  });

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
