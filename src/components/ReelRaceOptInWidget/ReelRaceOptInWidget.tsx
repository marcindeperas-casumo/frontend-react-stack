import * as React from "react";
import * as A from "Types/apollo";
import { useInterval } from "react-use";
import { DateTime } from "luxon";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { interpolate } from "Utils";
import { ReelRaceOptInPlayButton } from "Components/ReelRaceOptInPlayButton";
import { GameThumb } from "Components/GameThumb";
import "./reelRaceOptInWidget.scss"

type Props = {
  reelRace: A.ReelRaceOptInWidgetQuery["reelRaces"][0];
  t: A.ReelRaceOptInWidgetQuery["reelRaces"][0]["translations"];
};

const DEFAULT_REMAINING = "--:--";

function getRemainingTime (
  start: number,
  end: number,
  inProgress: boolean
) {

  const init = inProgress ? end : start;

  // for case when user keeps the widget opened
  // after RR has ended
  if (init - +new Date() < 0){
    return DEFAULT_REMAINING;
  };

  return DateTime
    .fromMillis(init)
    .diff(DateTime.fromMillis(+new Date()))
    .toFormat("mm:ss");
};

function getDuration(
  start: number,
  end: number
) {
  return DateTime
    .fromMillis(end)
    .diff(DateTime.fromMillis(start))
    .toFormat("mm");
};

export function ReelRaceOptInWidget({
  reelRace,
  t,
}: Props) {
  const [remaining, setRemainig] = React.useState<string>(DEFAULT_REMAINING);
  const [rrInProgress, setRRInProgress] = React.useState<boolean>(false);

  useInterval(() => {
    setRRInProgress(reelRace.startTime < +new Date());
    setRemainig(getRemainingTime(
      reelRace.startTime,
      reelRace.endTime,
      rrInProgress)
    );
  }, 1000)

  const prizesCounter = reelRace.formattedPrizes.length

  return (
    <div className="c-reel-race-opt-in-widget bg-grey-90 t-border-r u-padding-x--md u-padding-y--md">
      <Text
        size="sm"
        className="c-reel-race-opt-in-widget__header font-bold bg-black t-border-r-top-left t-border-r-top-right u-margin--none u-padding-y--md u-padding-x--md u-margin-bottom--md">
        Next Race coming up
      </Text>

      <Flex
        align="center"
      >
        <Flex.Item>
          <GameThumb
            src={reelRace.game.backgroundImage}
            alt={reelRace.game.name}
            mark={reelRace.game.logo}
            width={60}
            height={60}
          />
        </Flex.Item>
        <Flex.Item>
          <Text className="text-yellow-30 font-bold u-margin-bottom--sm u-margin-top--none">
            {reelRace.formattedPrize} Reel Race
          </Text>
          <span className="text-grey-50">
            {reelRace.game.name}
          </span>
        </Flex.Item>
      </Flex>

      <Flex
        className={cx(
          "o-flex--horizontal",
          "u-padding-y--lg"
        )}
        justify="space-between"
      >
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center t-border-right border-grey-5"
        >
          <Text
            tag="div"
            size="xs"
            className="u-font-weight-bold text-grey-50 u-text-transform-uppercase"
          >
            {reelRace.translations.spins}
          </Text>
          <Text
            tag="div"
            className="u-font-weight-bold"
          >
            {reelRace.spinLimit}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center"
        >
          <Text
            size="xs"
            tag="div"
            className="u-font-weight-bold text-grey-50 u-text-transform-uppercase"
          >
            {reelRace.translations.duration}
          </Text>
          <Text
            className="u-font-weight-bold"
            tag="div"
          >
            {reelRace.translations.durationTemplate &&
              interpolate(reelRace.translations.durationTemplate, {
                duration: getDuration(reelRace.startTime, reelRace.endTime),
              })}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center t-border-left border-grey-5"
        >
          <Text
            size="xs"
            tag="div"
            className="u-font-weight-bold text-grey-50 u-text-transform-uppercase"
          >
            Prizes
          </Text>
          <Text
            tag="div"
            className="u-font-weight-bold"
          >
            #1 - {prizesCounter}
          </Text>
        </Flex>
      </Flex>

      <Flex
        className="o-flex--1"
        justify="space-between"
      >
        <Flex direction="vertical">
          <Text
            size="xs"
            tag="div"
            className="u-font-weight-bold text-white text-grey-50"
          >
            {rrInProgress ? t.endingIn : t.startingIn}
          </Text>
          <Text
            size="lg"
            tag="div"
            className="u-font-weight-bold text-yellow-30"
          >
            {remaining}
          </Text>
        </Flex>

        <Flex>
          <ReelRaceOptInPlayButton
            reelRace={reelRace}
            t={t}
          />
        </Flex>
      </Flex>
    </div>
  );
}
