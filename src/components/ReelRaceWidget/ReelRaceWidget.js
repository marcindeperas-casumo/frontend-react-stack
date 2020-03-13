// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import { ReelRaceLeaderboard } from "Components/ReelRaceLeaderboard";
import * as A from "Types/apollo";
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
  scheduledGame: A.GameRow_Game,
  gameSlug: string,
  playing: Playing,
  t: ReelRacesTranslations,
  playerId: string,
  playerSpins: number,
  reelRaceStarted: ReelRace | null,
  reelRaceScheduled: ReelRace | null,
};

export function ReelRaceWidget(props: Props) {
  const {
    reelRaceStarted,
    reelRaceScheduled,
    isReelRacesFetched,
    areTranslationsFetched,
    fetchReelRaces,
    fetchTranslations,
    subscribeReelRacesUpdates,
    unsubscribeReelRacesUpdates,
  } = props;

  const reelRace = reelRaceStarted || reelRaceScheduled;

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
    const timeRemaining = (reelRaceActive: ReelRace): number =>
      DateTime.fromMillis(
        reelRaceStarted ? reelRaceActive.endTime : reelRaceActive.startTime
      )
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
      className="t-background-white t-border-bottom t-border-current-color t-color-grey-dark-2"
    >
      <ReelRaceWidgetHeader
        promoted={reelRace.promoted}
        prize={reelRace.prize}
        {...props}
      />
      {reelRaceStarted ? (
        <ReelRaceLeaderboard endTime={reelRace.endTime} {...props} />
      ) : (
        <ReelRaceWidgetInfo reelRace={reelRace} {...props} />
      )}
    </Flex>
  );
}
