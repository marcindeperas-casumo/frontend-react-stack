// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { POLL_INTERVAL } from "Src/constants";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { ReelRacesPage } from "./ReelRacesPage";
import { ReelRacesPageQuery } from "./ReelRacesPageContainer.graphql";

export type ReelRacesContentPage = {
  schedule_tab_title: string,
  previous_winners_tab_title: string,
  mobile_promoted_race_title_single: string,
  mobile_race_title_single: string,
  today: string,
  tomorrow: string,
};

export const ReelRacesPageContainer = () => {
  const { data } = useQuery<
    A.ReelRacesPageQuery,
    A.ReelRacesPageQueryVariables
  >(ReelRacesPageQuery, {
    variables: {
      limit: 20,
      prioritisePromoted: true,
    },
    pollInterval: POLL_INTERVAL.REEL_RACES,
  });

  const t = useTranslations<ReelRacesContentPage>(
    "mobile.tournament-campaigns"
  );

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return <ReelRacesPage reelRaces={reelRaces} t={t} />;
  }

  return null;
};
