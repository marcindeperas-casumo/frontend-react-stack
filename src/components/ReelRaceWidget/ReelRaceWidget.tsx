import Flex from "@casumo/cmp-flex";
import { useQuery } from "@apollo/client";
import * as React from "react";
import { slug, getCurrentReelRace } from "Models/reelRaces";
import type { ReelRacesTranslations } from "Models/reelRaces";
import * as A from "Types/apollo";
import { ReelRaceLeaderboard } from "Components/ReelRaceLeaderboard";
import { useTranslations } from "Utils/hooks";
import { ReelRaceWidgetQuery } from "./ReelRaceWidget.graphql";
import { ReelRaceWidgetHeader } from "./ReelRaceWidgetHeader";
import { ReelRaceWidgetInfo } from "./ReelRaceWidgetInfo";

type Props = {};
export function ReelRaceWidget(props: Props) {
  const t = useTranslations<ReelRacesTranslations>(slug);
  const { data, loading, refetch } = useQuery<
    A.ReelRaceWidgetQuery,
    A.ReelRaceWidgetQueryVariables
  >(ReelRaceWidgetQuery);

  React.useEffect(() => {
    let timeoutId; // eslint-disable-line fp/no-let
    const thirtyMinutes = 30 * 60 * 1000;

    function scheduleTimeout() {
      const nextUpdate = thirtyMinutes - (Date.now() % thirtyMinutes);
      // eslint-disable-next-line fp/no-mutation
      timeoutId = setTimeout(() => {
        refetch();
        scheduleTimeout();
      }, nextUpdate);
    }

    scheduleTimeout();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [refetch]);

  if (loading || !data || !data.reelRaces) {
    return null;
  }

  const reelRace = getCurrentReelRace(data.reelRaces);

  if (!reelRace || !t) {
    return null;
  }

  const hasStarted = reelRace.startTime < Date.now();

  return (
    <Flex
      direction="vertical"
      className="bg-white t-border-bottom border-grey-5 text-grey-70"
    >
      <ReelRaceWidgetHeader {...reelRace} t={t} />
      {hasStarted ? (
        <ReelRaceLeaderboard
          t={t}
          id={reelRace.id}
          initialLeaderboard={reelRace.leaderboard}
          cometdChannels={reelRace.cometdChannels}
          endTime={reelRace.endTime}
        />
      ) : (
        <ReelRaceWidgetInfo {...reelRace} t={t} />
      )}
    </Flex>
  );
}
