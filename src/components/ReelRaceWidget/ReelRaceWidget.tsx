// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { useQuery } from "@apollo/client";
import {
  slug,
  getCurrentReelRace,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"../../models/reelRaces"' has no exported ... Remove this comment to see the full error message
  type ReelRacesTranslations,
} from "Models/reelRaces";
import * as A from "Types/apollo";
import { ReelRaceLeaderboard } from "Components/ReelRaceLeaderboard";
import { useTranslations } from "Utils/hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ReelRaceWidget.graphql' or i... Remove this comment to see the full error message
import { ReelRaceWidgetQuery } from "./ReelRaceWidget.graphql";
import { ReelRaceWidgetHeader } from "./ReelRaceWidgetHeader";
import { ReelRaceWidgetInfo } from "./ReelRaceWidgetInfo";

type Props = {};
export function ReelRaceWidget(props: Props) {
  const t = useTranslations<ReelRacesTranslations>(slug);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
  const { data, loading, refetch } = useQuery<A.ReelRaceWidgetQuery, _>(
    ReelRaceWidgetQuery
  );

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

  // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'BigInt' a... Remove this comment to see the full error message
  const hasStarted = reelRace.startTime < Date.now();

  return (
    <Flex
      direction="vertical"
      className="t-background-white t-border-bottom t-border-grey-5 t-color-grey-70"
    >
      <ReelRaceWidgetHeader {...reelRace} t={t} />
      {hasStarted ? (
        <ReelRaceLeaderboard
          t={t}
          id={reelRace.id}
          initialLeaderboard={reelRace.leaderboard}
          cometdChannels={reelRace.cometdChannels}
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'BigInt' is not assignable to type 'number'.
          endTime={reelRace.endTime}
        />
      ) : (
        <ReelRaceWidgetInfo {...reelRace} t={t} />
      )}
    </Flex>
  );
}
