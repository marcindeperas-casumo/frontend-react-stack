// @flow
import React from "react";
import { filter, propEq } from "ramda";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { RACE_STATE } from "Models/reelRaces";
import { ReelRacesPage } from "./ReelRacesPage";
import { ReelRacesPageQuery } from "./ReelRacesPageContainer.graphql";

export type ReelRacesContentPage = {
  schedule_tab_title: string,
  previous_winners_tab_title: string,
  mobile_promoted_race_title_single: string,
  mobile_race_title_single: string,
  today: string,
  tomorrow: string,
  show_prizes_button: string,
};

export const ReelRacesPageContainer = () => {
  const { data } = useQuery<
    A.ReelRacesPageQuery,
    A.ReelRacesPageQueryVariables
  >(ReelRacesPageQuery, {
    variables: {
      limit: 20,
    },
    pollInterval: 30000,
  });

  const t = useTranslations<ReelRacesContentPage>(
    "mobile.tournament-campaigns"
  );

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    const scheduledreelRaces = filter(propEq("status", RACE_STATE.SCHEDULED))(
      reelRaces
    );

    return <ReelRacesPage reelRaces={scheduledreelRaces} t={t} />;
  }

  return null;
};
