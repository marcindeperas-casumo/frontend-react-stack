// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { PlayIcon, ClockIcon } from "@casumo/cmp-icons";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, EVENTS, EVENT_PROPS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackProvider from "Components/TrackProvider";
import TrackClick from "Components/TrackClick";
import Timer from "Components/Timer";
import { GameThumb } from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";
import OptInButton from "Components/OptInButton/OptInButton";
import GrandReelRaceBadge from "./GrandReelRaceBadge.svg";
import "./ReelRaceCard.scss";

type Props = ReelRace & {
  game: GameRow_Game,
  t: ReelRacesTranslations,
  optIn: () => void,
  launchGame: () => void,
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

  componentDidMount() {
    this.scheduleUpdate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  get timeRemainingBeforeStart(): number {
    return DateTime.fromMillis(this.props.startTime)
      .diffNow()
      .valueOf();
  }

  get button() {
    const { t } = this.props;

    if (this.timeRemainingBeforeStart <= 0) {
      if (this.props.opted) {
        return (
          <TrackClick
            eventName={EVENTS.MIXPANEL_REEL_RACE_CLICKED}
            data={{ state: BUTTON_STATE.PLAY }}
          >
            <Button
              size="sm"
              variant="variant-1"
              className="u-padding-y--md u-padding-x--lg"
              onClick={this.props.launchGame}
            >
              <PlayIcon size="sm" className="c-reel-race__button-icon" />
              <span className="u-margin-left">
                {t.opted_in_cta_single_game_short}
              </span>
            </Button>
          </TrackClick>
        );
      }

      return null; // In that case whole component should be hidden
    }

    const active = {
      label: t.opt_in,
      eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
      data: { state: BUTTON_STATE.OPT_IN },
      onClick: this.props.optIn,
    };

    const disabled = {
      label: t.opted_in,
      eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
      data: { state: BUTTON_STATE.OPTED_IN },
    };

    return (
      <OptInButton
        active={active}
        disabled={disabled}
        className="c-reel-race__button-icon"
        isOptedIn={this.props.opted}
      />
    );
  }

  get countdown() {
    const { t } = this.props;

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
              endTime={this.props.endTime}
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
              endTime={this.props.startTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
      );
    }

    const startTime = DateTime.fromMillis(this.props.startTime);
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
    return DateTime.fromMillis(this.props.endTime)
      .diff(DateTime.fromMillis(this.props.startTime))
      .toFormat("mm");
  }

  scheduleUpdate() {
    /**
     * we have to update this component in 2 cases:
     *   (start <= 30 min) - show "Starting in" with countdown
     *   (start <= now) - show "Play" button
     *
     * Update happens through calling `forceUpdate` and render method
     * takes over and renders what's currently needed.
     */
    const updateTime =
      this.timeRemainingBeforeStart > THIRTY_MINUTES
        ? this.timeRemainingBeforeStart - THIRTY_MINUTES
        : this.timeRemainingBeforeStart;

    this.timeout = setTimeout(() => {
      this.forceUpdate();
    }, updateTime);
  }

  showCaveatsModal = () => {
    launchModal({ modal: MODALS.TOP_LIST.REEL_RACE_CAVEATS });
  };

  render() {
    const { t } = this.props;

    if (this.timeRemainingBeforeStart <= 0 && !this.props.opted) {
      return null;
    }

    const trackData = {
      [EVENT_PROPS.LOCATION]: "Reel Race",
      splinLimit: this.props.spins,
      timeLimit: this.duration,
      minBet: this.props.minBet,
      mainPrize: this.props.prize,
      name: this.props.game.name,
      isPromoted: this.props.promoted,
    };

    return (
      <TrackProvider data={trackData}>
        <Flex
          className={[
            "o-flex__item",
            "o-flex__item-fixed-size",
            "t-border-r--md",
            "o-ratio",
            "o-ratio--reel-race-card",
            `t-color-${this.props.color}`,
          ].join(" ")}
          direction="vertical"
          justify="space-between"
          spacing="none"
        >
          <ImageLazy
            className="o-ratio__content"
            src={this.props.game.logoBackground}
            alt={this.props.game.name}
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
            <Flex align="center">
              <GameThumb
                src={this.props.game.logoBackground}
                alt={this.props.game.name}
                mark={this.props.game.logo}
              />
              {this.props.promoted && (
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
                  {t.compete_for.replace("{{prize}}", this.props.prize)}
                </Text>
                <Text
                  tag="span"
                  size="xs"
                  className="t-color-white u-opacity-75"
                >
                  <DangerousHtml html={this.props.game.name} />
                </Text>
              </Flex>
            </Flex>

            <Flex align="center">
              <Column top={this.props.spins} bottom={t.spins} />
              <div className="c-reel-race__separator u-margin-x--md" />
              <Column
                top={t.duration_template.replace(
                  "{{{duration}}}",
                  this.duration
                )}
                bottom={t.duration}
              />
              {this.props.minBet && (
                <>
                  <div className="c-reel-race__separator u-margin-x--md" />
                  <Column top={this.props.minBet} bottom={t.min_bet} />
                </>
              )}
            </Flex>

            <Flex direction="horizontal" justify="space-between" align="end">
              {this.countdown}
              {this.button}
            </Flex>
          </Flex>
        </Flex>
        {t.caveat_short && t.caveat_short !== "false" && (
          <Text
            size="xs"
            className="c-reel-race__terms t-color-grey"
            onClick={this.showCaveatsModal}
          >
            <DangerousHtml
              html={t.caveat_short.replace(
                "{{{ ctaTermsAndConditions }}}",
                'class="t-color-black"'
              )}
            />
          </Text>
        )}
      </TrackProvider>
    );
  }
}
