import * as React from "react";
import * as A from "Types/apollo";
import { useQuery } from "@apollo/client";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { ReelRaceOptInWidget } from "./ReelRaceOptInWidget";
import { ReelRaceOptInWidgetQuery } from "./ReelRaceOptInWidget.graphql";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage | null;
  expanded: boolean;
};

export function ReelRaceOptInWidgetContainer({
  t,
}: TProps) {

  const { data, loading } = useQuery<
    A.ReelRaceOptInWidgetQuery,
    A.ReelRaceOptInWidgetQueryVariables
  >(ReelRaceOptInWidgetQuery, {
    variables: {
      prioritisePromoted: false,
      limit: 1,
    },
  });

  if (loading) {
    return null;
  }

  return (
    <ReelRaceOptInWidget
      reelRace={data.reelRaces[0]}
      t={t}
    />
  );
}
