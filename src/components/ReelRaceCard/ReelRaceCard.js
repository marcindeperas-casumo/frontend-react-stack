// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { PlayIcon, TickIcon } from "@casumo/cmp-icons";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import Timer from "Components/Timer";
import GameThumb from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";
import GrandReelRaceBadge from "./GrandReelRaceBadge.svg";
import Clock from "./Clock.svg"; // use it from @casumo/cmp-icons if we're on v2
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
    <Text tag="span" size="sm" className="t-color-white u-opacity-75">
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
          <Button
            variant="variant-1"
            className="u-padding-vert--md u-padding-horiz--xlg"
            onClick={this.props.launchGame}
          >
            <PlayIcon className="c-reel-race__button-icon" />
            <Text tag="span" className="u-margin-left">
              {t.opted_in_cta_single_game_short}
            </Text>
          </Button>
        );
      }

      return null; // In that case whole component should be hidden
    }

    if (this.props.opted) {
      return (
        <Button
          variant="variant-1"
          className="u-padding-vert--md u-padding-horiz--xlg"
          disabled
        >
          <TickIcon className="c-reel-race__button-icon" />
          <Text tag="span" className="u-margin-left">
            {t.opted_in}
          </Text>
        </Button>
      );
    }

    return (
      <Button
        variant="variant-1"
        className="u-padding-vert--md u-padding-horiz--xlg"
        onClick={this.props.optIn}
      >
        <Text tag="span">{t.opt_in}</Text>
      </Button>
    );
  }

  get countdown() {
    const { t } = this.props;

    if (this.timeRemainingBeforeStart <= 0) {
      return (
        <Flex direction="vertical" spacing="none">
          <Text
            tag="span"
            size="sm"
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
            size="sm"
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
        <Clock class="u-margin-right" />
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

  render() {
    const { t } = this.props;

    if (this.timeRemainingBeforeStart <= 0 && !this.props.opted) {
      return null;
    }

    return (
      <Flex
        className={[
          "o-flex__item",
          "o-flex__item-fixed-size",
          "c-reel-race-card",
          "t-border-r--16",
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
            w: 330,
            blur: 100,
            sat: -50,
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
              <Text tag="span" className="u-font-weight-bold">
                {t.compete_for.replace("{{prize}}", this.props.prize)}
              </Text>
              <Text tag="span" size="sm" className="t-color-white u-opacity-75">
                <DangerousHtml html={this.props.game.name} />
              </Text>
            </Flex>
          </Flex>

          <Flex align="center">
            <Column top={this.props.spins} bottom={t.spins} />
            <div className="c-reel-race__separator u-margin-horiz--md" />
            <Column
              top={t.duration_template.replace("{{duration}}", this.duration)}
              bottom={t.duration}
            />
            {this.props.minBet && (
              <>
                <div className="c-reel-race__separator u-margin-horiz--md" />
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
    );
  }
}
