// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { POLL_INTERVAL } from "Src/constants";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { ReelRacesPage } from "./ReelRacesPage";
import { ReelRacesPageQuery } from "./ReelRacesPageContainer.graphql";

export const ReelRacesPageContainer = () => {
  const { data } = useQuery<A.ReelRaceListQuery, A.ReelRaceListQueryVariables>(
    ReelRacesPageQuery,
    {
      variables: {
        limit: 10,
      },
      pollInterval: POLL_INTERVAL.REEL_RACES,
    }
  );

  const t = useTranslations<{
    schedule_tab_title: string,
    previous_winners_tab_title: string,
  }>("mobile.tournament-campaigns");

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return <ReelRacesPage reelRaces={reelRaces} t={t} />;
  }

  return null;
};
