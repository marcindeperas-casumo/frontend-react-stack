import * as React from "react";
import { useInterval } from "react-use";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TournamentIcon } from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { interpolate } from "Utils";
import { ReelRaceOptInPlayButton } from "Components/ReelRaceOptInPlayButton";
import { GameThumb } from "Components/GameThumb";
import {
  DEFAULT_REMAINING,
  getRemainingTime,
  getDuration,
} from "./reelRaceOptInWidget.utils";
import "./reelRaceOptInWidget.scss";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
};

type TState = {
  remaining: string;
  rrInProgress: boolean;
};

export function ReelRaceOptInWidget({ reelRace }: Props) {
  const [state, setState] = React.useState<TState>({
    remaining: DEFAULT_REMAINING,
    rrInProgress: false,
  });

  useInterval(() => {
    setState(curr => ({
      rrInProgress: reelRace.startTime < Number(new Date()),
      remaining: getRemainingTime(
        reelRace.startTime,
        reelRace.endTime,
        curr.rrInProgress
      ),
    }));
  }, 1000);

  const prizesCounter = reelRace.formattedPrizes.length;
  const isPromoted = reelRace.promoted;

  const t = reelRace.translations;
  const extraTranslations = useTranslations<{
    schedule_next_text: string;
    leaderboard_prize: string;
  }>("mobile.tournament-campaigns");

  return (
    <div
      className={cx(
        "c-reel-race-opt-in-widget c-profile-icon-with-drawer__item o-position--relative bg-grey-90 t-border-r u-padding-x--md u-padding-y--md",
        {
          "t-border--md t-border-yellow-30": isPromoted,
        }
      )}
    >
      <Text
        size="sm"
        className="mb-md mt-[-16px] mx-[-16px] font-bold bg-black t-border-r-top-left t-border-r-top-right u-padding-y--md u-padding-x--md"
      >
        {extraTranslations?.schedule_next_text}
      </Text>
      {isPromoted && (
        <TournamentIcon
          size="md"
          className="rounded-tr-sm rounded-bl-xl text-center w-xlg h-xlg top-none right-none o-position--absolute bg-yellow-30 text-black"
        />
      )}
      <Flex align="center">
        <Flex.Item>
          <GameThumb
            src={reelRace.game.backgroundImage}
            alt={reelRace.game.name}
            mark={reelRace.game.logo}
            width={60}
            height={60}
          />
        </Flex.Item>
        <Flex.Item className="u-margin-left--md">
          <Text className="text-yellow-30 font-bold u-margin-bottom--sm u-margin-top--none">
            {t.competeFor &&
              interpolate(t.competeFor, {
                prize: reelRace.formattedPrize,
              })}
          </Text>
          <span className="text-grey-50">{reelRace.game.name}</span>
        </Flex.Item>
      </Flex>

      <Flex
        className={cx(
          "",
          "w-[230px]",
          "o-flex--horizontal",
          "u-padding-y--lg",
          "margin-l-n-22"
        )}
        justify="space-between"
      >
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center t-border-right border-grey-5 border-opacity-03"
        >
          <div className="text-[10px] u-font-weight-bold text-grey-50 u-text-transform-uppercase">
            {t.spins}
          </div>
          <Text tag="div" className="u-font-weight-bold">
            {reelRace.spinLimit}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center"
        >
          <div className="text-[10px] u-font-weight-bold text-grey-50 u-text-transform-uppercase">
            {t.duration}
          </div>
          <Text className="u-font-weight-bold" tag="div">
            {t.durationTemplate &&
              interpolate(t.durationTemplate, {
                duration: getDuration(reelRace.startTime, reelRace.endTime),
              })}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center t-border-left border-grey-5 border-opacity-03"
        >
          <div className="text-[10px] u-font-weight-bold text-grey-50 u-text-transform-uppercase">
            {extraTranslations?.leaderboard_prize}
          </div>
          <Text tag="div" className="u-font-weight-bold">
            #1 - {prizesCounter}
          </Text>
        </Flex>
      </Flex>

      <Flex className="o-flex--1" justify="space-between">
        <Flex direction="vertical">
          <div className="text-[10px] u-font-weight-bold text-white text-grey-50">
            {state.rrInProgress ? t.endingIn : t.startingIn}
          </div>
          <Text
            size="lg"
            tag="div"
            className="u-font-weight-bold text-yellow-30"
          >
            {state.remaining}
          </Text>
        </Flex>

        <Flex>
          <ReelRaceOptInPlayButton
            showOptedIn
            variant="secondary"
            reelRace={reelRace}
          />
        </Flex>
      </Flex>
    </div>
  );
}
