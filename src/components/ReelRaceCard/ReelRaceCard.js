// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { PlayIcon, TickIcon, TimeIconIcon } from "@casumo/cmp-icons";
import Timer from "Components/Timer";
import GameThumb from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";
import GrandReelRaceBadge from "./GrandReelRaceBadge.svg";
import "./ReelRaceCard.scss";

type Props = {
  status: "Scheduled" | "Started",
  type: "Standard" | "Promoted",
  startTime: number, // timestamp
  endTime: number, // timestamp
  minBet?: string,
  spinLimit: number,
  opted: boolean,
  prize: string,
  game: GameRow_Game,
  color: string, // cudl color style ie. "yellow-light-1", "red" or "purple-dark-2"
  t: {
    spins: string,
    duration: string,
    minBet: string,
    startingIn: string,
    endingIn: string,
    optIn: string,
    optedIn: string,
    play: string,
    prize: string,
  },
};

const Column = (props: { top: string | number, bottom: string | number }) => (
  <Flex direction="vertical" spacing="none">
    <span className="t-color-white u-font-weight-bold">{props.top}</span>
    <span className="t-color-white u-font-sm u-opacity-75">{props.bottom}</span>
  </Flex>
);

const THIRTY_MINUTES = 30 * 60 * 1000;

export class ReelRaceCard extends React.PureComponent<Props> {
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
          <Button variant="variant-1">
            <PlayIcon size="sml" />
            <span className="u-margin-left">{t.play}</span>
          </Button>
        );
      }

      return null; // In that case whole component should be hidden
    }

    if (this.props.opted) {
      return (
        <Button variant="variant-1" disabled>
          <TickIcon size="sml" />
          {t.optedIn}
        </Button>
      );
    }

    return (
      <Button
        variant="variant-1"
        className="u-padding-vert--md u-padding-horiz--xlg"
      >
        {t.optIn}
      </Button>
    );
  }

  get countdown() {
    const { t } = this.props;

    if (this.timeRemainingBeforeStart <= 0) {
      return (
        <Flex direction="vertical" spacing="none">
          <span className="t-color-white u-font-weight-bold u-font-sm">
            {t.endingIn}
          </span>
          <span className="u-font-weight-bold u-font-lg">
            <Timer
              endTime={this.props.endTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "Ended!"}
            />
          </span>
        </Flex>
      );
    }

    if (this.timeRemainingBeforeStart <= THIRTY_MINUTES) {
      return (
        <Flex direction="vertical" spacing="none">
          <span className="t-color-white u-font-weight-bold u-font-sm">
            {t.startingIn}
          </span>
          <span className="u-font-weight-bold u-font-lg">
            <Timer
              endTime={this.props.startTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "Starting!"}
            />
          </span>
        </Flex>
      );
    }

    const hour = DateTime.fromMillis(this.props.startTime).toFormat("hh:mm");
    return (
      <Flex spacing="none">
        <TimeIconIcon size="sml" /> {/* TODO(28094): that's wrong icon */}
        <span className="t-color-white u-font-weight-bold u-font-sm">
          Tonight {hour}
        </span>
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

    return (
      <Flex
        className={[
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
            blur: 75,
          }}
        />

        <Flex
          className="u-padding--md o-ratio__content"
          direction="vertical"
          spacing="none"
        >
          <Flex align="center">
            <Flex>
              <GameThumb
                src={this.props.game.logoBackground}
                alt={this.props.game.name}
                mark={this.props.game.logo}
              />
              {this.props.type === "Promoted" && (
                <GrandReelRaceBadge className="c-reel-race__badge" />
              )}
            </Flex>
            <Flex
              direction="vertical"
              spacing="sm"
              className="u-margin-left--md"
            >
              <span className="u-font-weight-bold">
                {t.prize} {this.props.prize}
              </span>
              <Text tag="span" size="sm" className="t-color-white u-opacity-75">
                <DangerousHtml html={this.props.game.name} />
              </Text>
            </Flex>
          </Flex>

          <Flex className="u-margin-vert--lg" align="center">
            <Column top={this.props.spinLimit} bottom={t.spins} />
            <div className="c-reel-race__separator u-margin-horiz--md" />
            <Column top={`${this.duration} min`} bottom={t.duration} />
            {this.props.minBet && (
              <>
                <div className="c-reel-race__separator u-margin-horiz--md" />
                <Column top={this.props.minBet} bottom={t.minBet} />
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
