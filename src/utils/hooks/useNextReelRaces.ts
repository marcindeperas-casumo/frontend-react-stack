import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { ReelRaceOptInWidgetQuery } from "Components/ReelRaceOptInWidget/ReelRaceOptInWidget.graphql";

export const useNextReelRace = () => {
  const { data: closestReelRace, loading: closestRRLoading } = useQuery<
    A.ReelRaceOptInWidgetQuery,
    A.ReelRaceOptInWidgetQueryVariables
  >(ReelRaceOptInWidgetQuery, {
    variables: {
      prioritisePromoted: false,
      limit: 2,
    },
  });

  const reelRaceGame = closestReelRace?.reelRaces?.[0];
  const reelRaceGameGB = closestReelRace?.reelRaces?.[1];
  return {
    loading: closestRRLoading,
    nextRR: reelRaceGame,
    nextRRGB: reelRaceGameGB,
  };
};
