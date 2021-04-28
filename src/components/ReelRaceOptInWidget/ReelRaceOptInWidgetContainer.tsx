import * as React from "react";
import * as A from "Types/apollo";
import { useQuery } from "@apollo/client";
import { ReelRaceOptInWidget } from "./ReelRaceOptInWidget";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { ReelRaceOptInWidgetQuery } from "./ReelRaceOptInWidget.graphql";
import { useGameModelContext } from "Components/GamePage/Contexts";

export function ReelRaceOptInWidgetContainer() {
  const currentReelRace = useCurrentReelRaceInfo();
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

  const loading = !currentReelRace || closestRRLoading;

  const closestRRisNotCurrent = currentReelRace?.game.id !== reelRaceGame?.game?.id;
  const currentGameIsClosestRR = reelRaceGame?.game?.slug === currentGameSlug && !reelRaceGame?.optedIn;

  if (loading || closestRRisNotCurrent || currentGameIsClosestRR) {
    return null;
  }

  return (
    <ReelRaceOptInWidget
      reelRace={closestReelRace.reelRaces[0]}
      t={closestReelRace.reelRaces[0].translations}
    />
  );
}
