// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { PlayIcon, ClockIcon } from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import type { ReelRace } from "Models/reelRaces";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, EVENTS, EVENT_PROPS } from "Src/constants";
import { launchGame } from "Services/LaunchGameService";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackProvider from "Components/TrackProvider";
import TrackClick from "Components/TrackClick";
import Timer from "Components/Timer";
import { GameThumb } from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";
import OptInButton from "Components/OptInButton/OptInButton";
import { interpolate } from "Utils";
import GrandReelRaceBadge from "./GrandReelRaceBadge.svg";
import "./ReelRaceCard.scss";

type Props = ReelRace & {
  reelRace: A.GameRow_Game,
  optIn: () => void,
};

const Column = (props: { top: string | number, bottom: string | number }) => (
  <Flex direction="vertical" spacing="none">
    <Text tag="span" className="t-color-white u-font-weight-bold">
      {props.top}
    </Text>
    <Text tag="span" size="xs" className="t-color-white u-opacity-75">
      {props.bottom}
    </Text>
  </Flex>
);

const THIRTY_MINUTES = 30 * 60 * 1000;

export class ReelRaceCard extends React.Component<Props> {
  timeout: TimeoutID;

  // componentDidMount() {
  //   this.scheduleUpdate();
  // }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  get timeRemainingBeforeStart(): number {
    return DateTime.fromMillis(this.props.reelRace.startTime)
      .diffNow()
      .valueOf();
  }

  get button() {
    const { translations: t } = this.props.reelRace;

    if (this.timeRemainingBeforeStart <= 0) {
      if (this.props.reelRace.opted) {
        return (
          <TrackClick
            eventName={EVENTS.MIXPANEL_REEL_RACE_CLICKED}
            data={{ state: BUTTON_STATE.PLAY }}
          >
            <Button
              size="sm"
              variant="primary"
              className="u-padding-y--md u-padding-x--lg"
              onLaunchGame={() =>
                // double check this
                launchGame({ slug: this.props.reelRace.game.slug })
              }
            >
              <PlayIcon size="sm" className="c-reel-race__button-icon" />
              <span className="u-margin-left">
                {t.optedInCtaSingleGameShort}
              </span>
            </Button>
          </TrackClick>
        );
      }

      return null;
    }

    const active = {
      label: t.optIn,
      eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
      data: { state: BUTTON_STATE.OPT_IN },
      // onClick: this.props.optIn,
    };

    const disabled = {
      label: t.optedIn,
      eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
      data: { state: BUTTON_STATE.OPTED_IN },
    };

    return (
      <OptInButton
        active={active}
        disabled={disabled}
        className="c-reel-race__button-icon"
        isOptedIn={this.props.reelRace.optedIn}
      />
    );
  }

  get countdown() {
    const { translations: t } = this.props.reelRace;

    if (this.timeRemainingBeforeStart <= 0) {
      return (
        <Flex direction="vertical" spacing="none">
          <Text
            tag="span"
            size="xs"
            className="t-color-white u-font-weight-bold"
          >
            {t.ending_in}
          </Text>
          <Text tag="span" size="lg" className="u-font-weight-bold">
            <Timer
              endTime={this.props.reelRace.endTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
      );
    }

    if (this.timeRemainingBeforeStart <= THIRTY_MINUTES) {
      return (
        <Flex direction="vertical" spacing="none">
          <Text
            tag="span"
            size="xs"
            className="t-color-white u-font-weight-bold"
          >
            {t.starting_in}
          </Text>
          <Text tag="span" size="lg" className="u-font-weight-bold">
            <Timer
              endTime={this.props.reelRace.startTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
      );
    }

    const startTime = DateTime.fromMillis(this.props.reelRace.startTime);
    return (
      <Flex spacing="none">
        <ClockIcon className="u-margin-right" />
        <Text
          tag="span"
          size="sm"
          className="t-color-white u-font-weight-bold u-text-transform-capitalize"
        >
          {startTime.toRelativeCalendar()} {startTime.toFormat("t")}
        </Text>
      </Flex>
    );
  }

  get duration() {
    return DateTime.fromMillis(this.props.reelRace.endTime)
      .diff(DateTime.fromMillis(this.props.reelRace.startTime))
      .toFormat("mm");
  }

  // scheduleUpdate() {
  //   /**
  //    * we have to update this component in 2 cases:
  //    *   (start <= 30 min) - show "Starting in" with countdown
  //    *   (start <= now) - show "Play" button
  //    *
  //    * Update happens through calling `forceUpdate` and render method
  //    * takes over and renders what's currently needed.
  //    */
  //   const updateTime =
  //     this.timeRemainingBeforeStart > THIRTY_MINUTES
  //       ? this.timeRemainingBeforeStart - THIRTY_MINUTES
  //       : this.timeRemainingBeforeStart;

  //   this.timeout = setTimeout(() => {
  //     this.forceUpdate();
  //   }, updateTime);
  // }

  showCaveatsModal = () => {
    launchModal({ modal: MODALS.TOP_LIST.REEL_RACE_CAVEATS });
  };

  render() {
    const { translations: t } = this.props.reelRace;

    // if (!this.props.areTranslationsFetched) {
    //   return null;
    // }

    if (R.isEmpty(this.props.reelRace.game)) {
      return null;
    }

    if (this.timeRemainingBeforeStart <= 0 && !this.props.reelRace.optedIn) {
      return null;
    }

    console.log("------------------------------------");
    console.log(this.duration);
    console.log("------------------------------------");

    const trackData = {
      [EVENT_PROPS.LOCATION]: "Reel Race",
      splinLimit: this.props.reelRace.spinLimit,
      timeLimit: this.duration,
      minBet: this.props.reelRace.minBet,
      mainPrize: this.props.reelRace.formattedPrize,
      name: this.props.reelRace.game.name,
      isPromoted: this.props.reelRace.promoted,
    };

    return (
      <TrackProvider data={trackData}>
        <Flex
          className={[
            "o-flex__item",
            "o-flex__item-fixed-size",
            "t-border-r--md",
            "u-overflow-hidden",
            "o-ratio",
            "o-ratio--reel-race-card",
            `t-color-yellow-light-1`,
            "c-reel-race-card",
          ].join(" ")}
          direction="vertical"
          justify="space-between"
          spacing="none"
        >
          <ImageLazy
            className="o-ratio__content"
            src={this.props.reelRace.game.backgroundImage}
            alt={this.props.reelRace.game.name}
            imgixOpts={{
              w: 348,
              h: 232,
              blur: 100,
              high: -70,
              fit: "crop",
            }}
          />

          <Flex
            className="u-padding--md o-ratio__content"
            direction="vertical"
            spacing="none"
            justify="space-between"
          >
            <TrackClick
              eventName={EVENTS.MIXPANEL_REEL_RACE_CLICKED}
              data={{ state: BUTTON_STATE.PLAY }}
            >
              <Flex
                align="center"
                className="u-cursor-pointer"
                onClick={() =>
                  // double check this
                  launchGame({ slug: this.props.reelRace.game.slug })
                }
              >
                <GameThumb
                  src={this.props.reelRace.game.backgroundImage}
                  alt={this.props.reelRace.game.name}
                  mark={this.props.reelRace.game.logo}
                />
                {this.props.reelRace.promoted && (
                  <GrandReelRaceBadge className="c-reel-race__badge" />
                )}
                <Flex
                  direction="vertical"
                  spacing="sm"
                  className="u-margin-left--md"
                >
                  <Text
                    tag="span"
                    className="u-margin-bottom--sm u-font-weight-bold"
                  >
                    {interpolate(t.competeFor, {
                      prize: this.props.reelRace.formattedPrize,
                    })}
                  </Text>
                  <Text
                    tag="span"
                    size="xs"
                    className="t-color-white u-opacity-75"
                  >
                    <DangerousHtml html={this.props.reelRace.game.name} />
                  </Text>
                </Flex>
              </Flex>
            </TrackClick>

            <Flex align="center">
              <Column top={this.props.reelRace.spinLimit} bottom={t.spins} />
              <div className="c-reel-race__separator u-margin-x--md" />
              <Column
                top={interpolate(t.durationTemplate, {
                  duration: this.duration,
                })}
                bottom={t.duration}
              />
              {this.props.reelRace.minBet && (
                <>
                  <div className="c-reel-race__separator u-margin-x--md" />
                  <Column top={this.props.reelRace.minBet} bottom={t.minBet} />
                </>
              )}
            </Flex>

            <Flex direction="horizontal" justify="space-between" align="end">
              {this.countdown}
              {this.button}
            </Flex>
          </Flex>
        </Flex>
        {t.caveatShort && t.caveatShort !== "false" && (
          <Text
            size="xs"
            className="c-reel-race__terms t-color-grey"
            onClick={this.showCaveatsModal}
          >
            <DangerousHtml
              html={interpolate(t.caveatShort, {
                ctaTermsAndConditions: 'class="t-color-black"',
              })}
            />
          </Text>
        )}
      </TrackProvider>
    );
  }
}
