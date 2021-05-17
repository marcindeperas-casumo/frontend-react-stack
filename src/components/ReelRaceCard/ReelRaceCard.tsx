import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import * as React from "react";
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
import { interpolate, timeRemainingBeforeStart } from "Utils";
import { ReelRaceOptInPlayButton } from "Components/ReelRaceOptInPlayButton";
import GrandReelRaceBadge from "./GrandReelRaceBadge.svg";
import "./ReelRaceCard.scss";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
  optIn: () => void;
};

const Column = (props: {
  top: string | undefined | number;
  bottom: string | undefined | number;
}) => (
  <Flex direction="vertical" spacing="none">
    {props.top && (
      <Text tag="span" className="text-white u-font-weight-bold">
        {props.top}
      </Text>
    )}
    {props.bottom && (
      <Text tag="span" size="xs" className="text-white t-opacity--75">
        {props.bottom}
      </Text>
    )}
  </Flex>
);

const THIRTY_MINUTES = 30 * 60 * 1000;

export const ReelRaceCard = ({ reelRace, optIn}: Props) => {
  const countdown = () => {
    const { translations: t, endTime, startTime, status } = reelRace;

    if (status === RACE_STATE.STARTED) {
      return (
        <Flex direction="vertical" spacing="none">
          <Text tag="span" size="xs" className="text-white u-font-weight-bold">
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
          <Text tag="span" size="xs" className="text-white u-font-weight-bold">
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
    // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'Duration'... Remove this comment to see the full error message
    const isTomorrow = startTimeDate.startOf("day").diffNow("days") > 0;

    return (
      <Flex spacing="none">
        <TimeLockedIcon className="u-margin-right" />
        <Text tag="span" size="sm" className="text-white u-font-weight-bold">
          {`${isTomorrow ? t.tomorrow : t.today} ${startTimeDate.toFormat(
            "t"
          )}`}
        </Text>
      </Flex>
    );
  }

  const duration = () => {
    const { endTime, startTime } = reelRace;
    return DateTime.fromMillis(endTime)
      .diff(DateTime.fromMillis(startTime))
      .toFormat("mm");
  }

  const showCaveatsModal = () => {
    launchModal({ modal: MODALS.TOP_LIST.REEL_RACE_CAVEATS });
  };

  const {
    translations: t,
    game,
    spinLimit,
    formattedPrize,
    promoted,
  } = reelRace;

  const trackData = {
    [EVENT_PROPS.LOCATION]: "Reel Race",
    spinLimit,
    timeLimit: duration(),
    mainPrize: formattedPrize,
    name: game.name,
    isPromoted: promoted,
  };

  return (
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    <TrackProvider data={trackData}>
      <Flex
        className={[
          "o-flex__item",
          "o-flex__item-fixed-size",
          "t-border-r--md",
          "u-overflow--hidden",
          "o-ratio",
          "o-ratio--reel-race-card",
          "text-yellow-30",
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
              className="u-cursor--pointer"
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
                  className="text-white t-opacity--75"
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
                  duration: duration(),
                })}
                bottom={t.duration}
              />
            )}
          </Flex>

          <Flex direction="horizontal" justify="space-between" align="end">
            {countdown()}
            <ReelRaceOptInPlayButton
              reelRace={reelRace}
              showOptedIn
            />
          </Flex>
        </Flex>
      </Flex>
      {t.caveatShort && t.caveatShort !== "false" && (
        <Text
          size="xs"
          className="c-reel-race__terms u-margin-top--md text-grey-90"
          onClick={showCaveatsModal}
        >
          <DangerousHtml
            html={interpolate(t.caveatShort, {
              ctaTermsAndConditions:
                'class="text-black u-font-weight-bold u-text-decoration-underline"',
            })}
          />
        </Text>
      )}
    </TrackProvider>
  );
}
