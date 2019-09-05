// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import Timer from "Components/Timer";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import type { Playing } from "Models/playing";
import { RR_STATE } from "Models/reelRaceWidget";
import type { LeaderBoard } from "Models/reelRaceWidget";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate } from "Utils";
import { GameThumb } from "Components/GameThumb";
import GrandReelRaceBadge from "Components/ReelRaceCard/GrandReelRaceBadge.svg";
import { LeaderBoardWidget } from "./LeaderBoardWidget";
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
  leaderboard: Array<LeaderBoard>,
  playerId: string,
};

export function ReelRaceWidget(props: Props) {
  const { t, game, playing } = props;

  const started = props.status === RR_STATE.STARTED;
  const timerEndTime = started ? props.endTime : props.startTime;

  const timeRemaining = (): number =>
    DateTime.fromMillis(timerEndTime)
      .diffNow()
      .valueOf();

  React.useEffect(() => {
    if (!props.isReelRacesFetched) {
      props.fetchReelRaces();
    }
    if (!props.areTranslationsFetched) {
      props.fetchTranslations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (props.tournamentId) {
      props.subscribeReelRacesUpdates();
      const timer = setTimeout(() => {
        props.fetchReelRaces();
      }, timeRemaining());

      return () => {
        props.unsubscribeReelRacesUpdates();
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tournamentId]);

  if (!props.startTime) {
    return null;
  }

  return (
    <Flex direction="vertical" justify="space-between">
      {playing.gameId !== props.gameSlug && (
        <Flex
          align="center"
          className="u-padding-top--md u-padding-x--md u-cursor-pointer"
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
              {interpolate(t.compete_for, { prize: props.prize })}
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
            className="u-font-weight-bold t-color-yellow"
          >
            <Timer
              endTime={timerEndTime}
              render={o => `${o.minutes}:${o.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          spacing="none"
          className="u-text-align-right"
        >
          <Text tag="span" size="xs" className="u-opacity-75">
            {t.spins}
          </Text>
          <Text
            tag="span"
            size="lg"
            className="u-font-weight-bold t-color-green"
          >
            {props.spins}
          </Text>
        </Flex>
      </Flex>
      <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
      {started && props.leaderboard && (
        <>
          <LeaderBoardWidget
            leaderboard={props.leaderboard}
            playerId={props.playerId}
          />
          <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
        </>
      )}
    </Flex>
  );
}
