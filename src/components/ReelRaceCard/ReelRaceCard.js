// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { PlayIcon, TimeLockedIcon } from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, EVENTS, EVENT_PROPS } from "Src/constants";
import { launchGame } from "Services/LaunchGameService";
import { BUTTON_STATE, RACE_STATE } from "Models/reelRaces";
import TrackProvider from "Components/TrackProvider";
import TrackClick from "Components/TrackClick";
import Timer from "Components/Timer";
import { GameThumb } from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";
import OptInButton from "Components/OptInButton/OptInButton";
import { interpolate, timeRemainingBeforeStart } from "Utils";
import GrandReelRaceBadge from "./GrandReelRaceBadge.svg";
import "./ReelRaceCard.scss";

type Props = {
  reelRace: A.ReelRaceCard_ReelRace,
  optIn: () => void,
};

const Column = (props: {
  top: ?string | ?number,
  bottom: ?string | ?number,
}) => (
  <Flex direction="vertical" spacing="none">
    {props.top && (
      <Text tag="span" className="t-color-white u-font-weight-bold">
        {props.top}
      </Text>
    )}
    {props.bottom && (
      <Text tag="span" size="xs" className="t-color-white u-opacity-75">
        {props.bottom}
      </Text>
    )}
  </Flex>
);

const THIRTY_MINUTES = 30 * 60 * 1000;

export class ReelRaceCard extends React.Component<Props> {
  get button() {
    const { translations: t, game, optedIn, startTime } = this.props.reelRace;
    const active = {
      label: t.optIn || "",
      eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
      data: { state: BUTTON_STATE.OPT_IN },
      onClick: this.props.optIn,
    };
    const disabled = {
      label: t.optedIn || "",
      eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
      data: { state: BUTTON_STATE.OPTED_IN },
    };

    if (timeRemainingBeforeStart(startTime) <= 0 && optedIn) {
      return (
        <TrackClick
          eventName={EVENTS.MIXPANEL_REEL_RACE_CLICKED}
          data={{ state: BUTTON_STATE.PLAY }}
        >
          <ButtonPrimary
            size="sm"
            className="u-padding-y--md u-padding-x--lg"
            onClick={() => launchGame({ slug: game.slug })}
          >
            <PlayIcon size="sm" className="c-reel-race__button-icon" />
            <span className="u-margin-left">{t.optedInCtaSingleGameShort}</span>
          </ButtonPrimary>
        </TrackClick>
      );
    }

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
    const { translations: t, endTime, startTime, status } = this.props.reelRace;

    if (status === RACE_STATE.STARTED) {
      return (
        <Flex direction="vertical" spacing="none">
          <Text
            tag="span"
            size="xs"
            className="t-color-white u-font-weight-bold"
          >
            {t.endingIn}
          </Text>
          <Text tag="span" size="lg" className="u-font-weight-bold">
            <Timer
              endTime={endTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
      );
    }

    if (timeRemainingBeforeStart(startTime) <= THIRTY_MINUTES) {
      return (
        <Flex direction="vertical" spacing="none">
          <Text
            tag="span"
            size="xs"
            className="t-color-white u-font-weight-bold"
          >
            {t.startingIn}
          </Text>
          <Text tag="span" size="lg" className="u-font-weight-bold">
            <Timer
              endTime={startTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
      );
    }

    const startTimeDate = DateTime.fromMillis(startTime);
    const isTomorrow = startTimeDate.startOf("day").diffNow("days") > 0;

    return (
      <Flex spacing="none">
        <TimeLockedIcon className="u-margin-right" />
        <Text tag="span" size="sm" className="t-color-white u-font-weight-bold">
          {`${isTomorrow ? t.tomorrow : t.today} ${startTimeDate.toFormat(
            "t"
          )}`}
        </Text>
      </Flex>
    );
  }

  get duration() {
    const { endTime, startTime } = this.props.reelRace;
    return DateTime.fromMillis(endTime)
      .diff(DateTime.fromMillis(startTime))
      .toFormat("mm");
  }

  showCaveatsModal = () => {
    launchModal({ modal: MODALS.TOP_LIST.REEL_RACE_CAVEATS });
  };

  render() {
    const {
      translations: t,
      game,
      spinLimit,
      formattedPrize,
      promoted,
    } = this.props.reelRace;

    const trackData = {
      [EVENT_PROPS.LOCATION]: "Reel Race",
      spinLimit,
      timeLimit: this.duration,
      mainPrize: formattedPrize,
      name: game.name,
      isPromoted: promoted,
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
            "t-color-yellow-30",
            "c-reel-race-card",
          ].join(" ")}
          direction="vertical"
          justify="space-between"
          spacing="none"
        >
          <ImageLazy
            className="o-ratio__content"
            src={game?.backgroundImage}
            alt={game?.name}
            imgixOpts={{
              w: 348,
              h: 232,
              high: -70,
              fit: "crop",
              blendAlpha: 55,
              blendColor: "000000",
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
                onClick={() => launchGame({ slug: game.slug })}
              >
                <GameThumb
                  src={game.backgroundImage}
                  alt={game.name}
                  mark={game.logo}
                />
                {promoted && (
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
                    {t.competeFor &&
                      interpolate(t.competeFor, {
                        prize: formattedPrize,
                      })}
                  </Text>
                  <Text
                    tag="span"
                    size="xs"
                    className="t-color-white u-opacity-75"
                  >
                    <DangerousHtml html={game.name} />
                  </Text>
                </Flex>
              </Flex>
            </TrackClick>

            <Flex align="center">
              {t.spins && <Column top={spinLimit} bottom={t.spins} />}
              <div className="c-reel-race__separator u-margin-x--md" />
              {t.durationTemplate && (
                <Column
                  top={interpolate(t.durationTemplate, {
                    duration: this.duration,
                  })}
                  bottom={t.duration}
                />
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
            className="c-reel-race__terms t-color-grey-20"
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
