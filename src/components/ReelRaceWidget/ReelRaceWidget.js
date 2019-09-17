// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import ReelRaceLeaderboardWidget from "Components/ReelRaceLeaderboardWidget/";
import Timer from "Components/Timer";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import type { Playing } from "Models/playing";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate } from "Utils";
import { GameThumb } from "Components/GameThumb";
import GrandReelRaceBadge from "Components/ReelRaceCard/GrandReelRaceBadge.svg";
import "./ReelRaceWidget.scss";

type Props = ReelRace & {
  fetchReelRaces: () => void,
  isReelRacesFetched: () => void,
  fetchTranslations: () => void,
  subscribeReelRacesUpdates: () => void,
  unsubscribeReelRacesUpdates: () => void,
  launchGame: () => void,
  areTranslationsFetched: boolean,
  game: GameRow_Game,
  playing: Playing,
  t: ReelRacesTranslations,
  playerId: string,
  playerSpins: number,
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export function ReelRaceWidget(props: Props) {
  const [started, setStarted] = React.useState(false);
  const {
    t,
    game,
    playing,
    endTime,
    startTime,
    isReelRacesFetched,
    areTranslationsFetched,
    fetchReelRaces,
    fetchTranslations,
    tournamentId,
    subscribeReelRacesUpdates,
    unsubscribeReelRacesUpdates,
  } = props;

  React.useEffect(() => {
    const now = Date.now();
    return setStarted(Boolean(startTime < now && endTime > now));
  }, [startTime, endTime]);

  React.useEffect(() => {
    if (!isReelRacesFetched) {
      fetchReelRaces();
    }
    if (!areTranslationsFetched) {
      fetchTranslations();
    }
  }, [
    isReelRacesFetched,
    areTranslationsFetched,
    fetchReelRaces,
    fetchTranslations,
  ]);

  React.useEffect(() => {
    const timeRemaining = (): number =>
      DateTime.fromMillis(started ? endTime : startTime)
        .diffNow()
        .valueOf();

    if (tournamentId) {
      subscribeReelRacesUpdates();
      const timer = setTimeout(() => {
        fetchReelRaces();
      }, timeRemaining());

      return () => {
        unsubscribeReelRacesUpdates();
        clearTimeout(timer);
      };
    }
  }, [
    endTime,
    fetchReelRaces,
    startTime,
    started,
    subscribeReelRacesUpdates,
    tournamentId,
    unsubscribeReelRacesUpdates,
  ]);

  if (!props.startTime) {
    return null;
  }

  // eslint-disable-next-line no-console
  console.log(
    `${started ? "STARTED" : "NEXT"} - ${props.gameSlug} - ${tournamentId}`
  );

  return (
    <Flex direction="vertical" justify="space-between">
      {playing.gameId !== props.gameSlug && (
        <Flex
          align="center"
          className="u-padding-top--md u-padding-x--md u-cursor-pointer u-position-relative"
          onClick={props.launchGame}
        >
          <GameThumb
            src={game.logoBackground}
            alt={game.name}
            mark={game.logo}
          />
          {props.promoted && (
            <GrandReelRaceBadge className="c-reel-race__badge" />
          )}
          <Flex direction="vertical" spacing="sm" className="u-margin-left--md">
            <Text tag="span" className="u-margin-bottom--sm u-font-weight-bold">
              {interpolate(t.compete_for, {
                prize: props.prize,
              })}
            </Text>
            <Text tag="span" size="xs">
              <DangerousHtml html={game.name} />
            </Text>
          </Flex>
        </Flex>
      )}
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
            {started ? (
              <Timer
                endTime={endTime}
                render={o => `${o.minutes}:${o.seconds}`}
                onEnd={() => "00:00"}
              />
            ) : (
              <Timer
                endTime={startTime}
                render={o => `${o.minutes}:${o.seconds}`}
                onEnd={() => "00:00"}
              />
            )}
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
            {props.playerSpins === null ? props.spins : props.playerSpins}
          </Text>
        </Flex>
      </Flex>
      <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
      {started && (
        <>
          <ReelRaceLeaderboardWidget
            tournamentId={tournamentId}
            playerId={props.playerId}
          />
          <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
        </>
      )}
    </Flex>
  );
}
