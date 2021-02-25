// @flow
import React from "react";
import { filter, propEq, anyPass } from "ramda";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { RACE_STATE } from "Models/reelRaces";
import { ReelRacesPageTabScheduleQuery } from "./ReelRacesPageTabScheduleContainer.graphql";
import type { ReelRacesContentPage } from "./ReelRacesPageContainer";
import { ReelRacesPageTabSchedule } from "./ReelRacesPageTabSchedule";

type Props = {
  t: ?ReelRacesContentPage,
};

export function ReelRacesPageTabScheduleContainer({ t }: Props) {
  const { data } = useQuery<
    A.ReelRacesPageTabScheduleQuery,
    A.ReelRacesPageTabScheduleQueryVariables
  >(ReelRacesPageTabScheduleQuery, {
    variables: {
      limit: 30,
    },
  });

  const reelRaces = data?.reelRaces || [];

  const scheduledReelRaces = filter(
    anyPass([
      propEq("status", RACE_STATE.SCHEDULED),
      propEq("status", RACE_STATE.STARTED),
    ])
  )(reelRaces);

  if (!scheduledReelRaces.length) {
    return null;
  }

  return <ReelRacesPageTabSchedule reelRaces={scheduledReelRaces} t={t} />;
}
