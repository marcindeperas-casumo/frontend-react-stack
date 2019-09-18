// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import ReelRaceLeaderboardWidget from "Components/ReelRaceLeaderboardWidget/";
import Timer from "Components/Timer";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import type { Playing } from "Models/playing";
import { ReelRaceWidgetHeader } from "./ReelRaceWidgetHeader";
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

const getTimer = (time: number) => {
  if (time) {
    return (
      <Timer
        endTime={time}
        render={o => `${o.minutes}:${o.seconds}`}
        onEnd={() => "00:00"}
      />
    );
  }
};

// eslint-disable-next-line sonarjs/cognitive-complexity
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

  const time = started ? reelRace.endTime : reelRace.startTime;

  return (
    <Flex direction="vertical" justify="space-between">
      <ReelRaceWidgetHeader reelRace={reelRace} {...props} />
      <Flex direction="horizontal" className="u-padding--md">
        <Flex direction="vertical" spacing="none" className="flex-1">
          <Text tag="span" size="xs">
            {started ? t.ending_in : t.starting_in}
          </Text>
          <Text
            tag="span"
            size="lg"
            className="u-font-weight-bold t-color-plum"
          >
            {getTimer(time)}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          spacing="none"
          className="u-text-align-right"
        >
          <Text tag="span" size="xs" className="u-opacity-75">
            {started ? t.spin_count : t.spins}
          </Text>
          <Text
            tag="span"
            size="lg"
            className="u-font-weight-bold t-color-plum"
          >
            {started ? props.playerSpins : reelRace.spins}
          </Text>
        </Flex>
      </Flex>
      <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
      {started && (
        <>
          <ReelRaceLeaderboardWidget />
          <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
        </>
      )}
    </Flex>
  );
}
