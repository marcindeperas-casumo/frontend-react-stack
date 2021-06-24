import * as React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { ReelRaceOptInWidget } from "./ReelRaceOptInWidget";
import { ReelRaceOptInWidgetQuery } from "./ReelRaceOptInWidget.graphql";

export function ReelRaceOptInWidgetContainer() {
  const { slug: currentGameSlug } = useGameModelContext();

  const { data: closestReelRace, loading: closestRRLoading } = useQuery<
    A.ReelRaceOptInWidgetQuery,
    A.ReelRaceOptInWidgetQueryVariables
  >(ReelRaceOptInWidgetQuery, {
    variables: {
      prioritisePromoted: false,
      limit: 1,
    },
  });

  const reelRaceGame = closestReelRace?.reelRaces[0];
  const currentGameIsClosestRROptedIn =
    reelRaceGame?.game?.slug === currentGameSlug && reelRaceGame?.optedIn;

  if (closestRRLoading || currentGameIsClosestRROptedIn) {
    return null;
  }

  return (
    <ReelRaceOptInWidget
      reelRace={reelRaceGame as A.ReelRaceCard_ReelRaceFragment}
    />
  );
}
