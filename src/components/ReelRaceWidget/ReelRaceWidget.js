// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import ReelRaceLeaderboardWidget from "Components/ReelRaceLeaderboardWidget/";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import type { Playing } from "Models/playing";
import { ReelRaceWidgetHeader } from "./ReelRaceWidgetHeader";
import { ReelRaceWidgetInfo } from "./ReelRaceWidgetInfo";
import "./ReelRaceWidget.scss";

type Props = {
  fetchReelRaces: () => void,
  isReelRacesFetched: () => void,
  fetchTranslations: () => void,
  subscribeReelRacesUpdates: () => void,
  unsubscribeReelRacesUpdates: () => void,
  launchGame: () => void,
  areTranslationsFetched: boolean,
  scheduledGame: GameRow_Game,
  gameSlug: string,
  playing: Playing,
  t: ReelRacesTranslations,
  playerId: string,
  playerSpins: number,
  started: ReelRace | null,
  scheduled: ReelRace | null,
};

export function ReelRaceWidget(props: Props) {
  const {
    t,
    started,
    scheduled,
    isReelRacesFetched,
    areTranslationsFetched,
    fetchReelRaces,
    fetchTranslations,
    subscribeReelRacesUpdates,
    unsubscribeReelRacesUpdates,
  } = props;

  const reelRace = started || scheduled;

  React.useEffect(() => {
    if (!isReelRacesFetched) {
      fetchReelRaces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReelRacesFetched]);

  React.useEffect(() => {
    if (!areTranslationsFetched) {
      fetchTranslations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areTranslationsFetched]);

  React.useEffect(() => {
    const timeRemaining = (rR: ReelRace): number =>
      DateTime.fromMillis(started ? rR.endTime : rR.startTime)
        .diffNow()
        .valueOf();

    if (reelRace && reelRace.tournamentId) {
      subscribeReelRacesUpdates();
      const timer = setTimeout(() => {
        fetchReelRaces();
      }, timeRemaining(reelRace));

      return () => {
        unsubscribeReelRacesUpdates();
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reelRace]);

  if (!reelRace) {
    return null;
  }

  return (
    <Flex
      direction="vertical"
      justify="space-between"
      className="t-border-bottom t-border-current-color"
    >
      <ReelRaceWidgetHeader reelRace={reelRace} {...props} />
      {/* <ReelRaceWidgetInfo
        reelRace={reelRace}
        started={Boolean(started)}
        {...props}
      /> */}
      {started && <ReelRaceLeaderboardWidget />}
    </Flex>
  );
}
