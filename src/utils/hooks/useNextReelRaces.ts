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
      limit: 1,
    },
  });

  const reelRaceGame = closestReelRace?.reelRaces?.[0];

  return {
    loading: closestRRLoading,
    nextRR: reelRaceGame,
  };
};
