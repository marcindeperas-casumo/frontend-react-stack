// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { Button, ButtonPrimary } from "@casumo/cmp-button";
import cx from "classnames";
import {
  TimeLockedIcon,
  SpinIcon,
  AthleticsIcon,
  PlayIcon,
} from "@casumo/cmp-icons";
import { interpolate, noop } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { launchGame } from "Services/LaunchGameService";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";
import DangerousHtml from "Components/DangerousHtml";
import * as A from "Types/apollo";
import { launchModal } from "Services/LaunchModalService";
import { EVENTS, MODALS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackClick from "Components/TrackClick";
import { ReelRaceScheduleCardPrizes } from "./ReelRaceScheduleCardPrizes";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRace,
  t: ReelRacesContentPage,
  optIn: () => void,
  showPrizes: boolean,
};

export function ReelRaceScheduleCardContent({
  reelRace,
  t,
  optIn,
  showPrizes = false,
}: Props) {
  const [expandPrizes, setExpandPrizes] = React.useState(showPrizes);
  const isNotMobile = useIsScreenMinimumTablet();

  const getDuration = () => {
    return DateTime.fromMillis(reelRace.endTime)
      .diff(DateTime.fromMillis(reelRace.startTime))
      .toFormat("mm");
  };
  const toggleExpandPrizes = React.useCallback(
    () => setExpandPrizes(state => !state),
    [setExpandPrizes]
  );

  const active = {
    label: reelRace.translations.optIn || "",
    eventName: EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED,
    data: { state: BUTTON_STATE.OPT_IN },
    onClick: optIn,
  };
  const disabled = {
    label: "Play",
    eventName: EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED,
    data: { state: BUTTON_STATE.PLAY },
    onClick: (slug: string) => launchGame({ slug }),
  };

  const showCaveatsModal = () => {
    launchModal({ modal: MODALS.TOP_LIST.REEL_RACE_CAVEATS });
  };

  return (
    <>
      <Flex
        className={cx(
          "u-padding--lg",
          isNotMobile && "u-width--1/2 u-margin-left--4xlg"
        )}
      >
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center"
        >
          <TimeLockedIcon className="t-color-grey-50" />
          <Text
            size="xs"
            className="u-font-weight-bold u-padding-top u-padding-bottom--sm t-color-grey-50 u-text-transform-uppercase"
          >
            {reelRace.translations.startingIn}
          </Text>
          <Text className="u-font-weight-bold">
            {DateTime.fromMillis(reelRace.startTime).toFormat("t")}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center t-border-left t-border-right t-border-grey-5"
        >
          <SpinIcon className="t-color-grey-50" />
          <Text
            size="xs"
            className="u-font-weight-bold u-padding-top u-padding-bottom--sm t-color-grey-50 u-text-transform-uppercase"
          >
            {reelRace.translations.spins}
          </Text>
          <Text className="u-font-weight-bold">{reelRace.spinLimit}</Text>
        </Flex>
        <Flex
          direction="vertical"
          align="center"
          className="o-flex--1 u-text-align-center"
        >
          <AthleticsIcon className="t-color-grey-50" />
          <Text
            size="xs"
            className="u-font-weight-bold u-padding-top u-padding-bottom--sm t-color-grey-50 u-text-transform-uppercase"
          >
            {reelRace.translations.duration}
          </Text>
          <Text className="u-font-weight-bold">
            {reelRace.translations.durationTemplate &&
              interpolate(reelRace.translations.durationTemplate, {
                duration: getDuration(),
              })}
          </Text>
        </Flex>
      </Flex>

      <div
        className={cx(
          "o-flex-align--center@tablet o-flex--vertical@mobile",
          isNotMobile && "u-margin-left--4xlg"
        )}
      >
        <div className="u-width--1/2@tablet">
          {reelRace.translations.caveatShort &&
            reelRace.translations.caveatShort !== "false" && (
              <Text
                tag="div"
                className="t-color-grey-50 u-padding-x--md"
                style={{ maxWidth: 300 }}
                onClick={showCaveatsModal}
              >
                <DangerousHtml
                  html={interpolate(reelRace.translations.caveatShort, {
                    ctaTermsAndConditions: 'class="t-color-grey-50"',
                  })}
                />
              </Text>
            )}
        </div>
        <Flex
          className="u-width--1/2@tablet u-margin-top--md u-padding-x--md u-margin-bottom--md"
          spacing="3xlg"
        >
          <Button
            size="md"
            onClick={toggleExpandPrizes}
            className="u-width--full"
          >
            {expandPrizes ? t?.hide_prizes_button : t?.show_prizes_button}
          </Button>
          <div className="u-width--full u-padding-left--md">
            {reelRace.optedIn ? (
              <TrackClick eventName={disabled.eventName} data={disabled.data}>
                <ButtonPrimary
                  size="md"
                  onClick={() =>
                    disabled.onClick
                      ? disabled.onClick(reelRace.game.slug)
                      : noop()
                  }
                  className="u-width--full"
                >
                  <PlayIcon size="sm" />
                  <Text tag="span" className="u-margin-left">
                    {disabled.label}
                  </Text>
                </ButtonPrimary>
              </TrackClick>
            ) : (
              <TrackClick eventName={active.eventName} data={active.data}>
                <ButtonPrimary
                  size="md"
                  onClick={active.onClick || noop}
                  className="u-width--full"
                >
                  <Text tag="span">{active.label}</Text>
                </ButtonPrimary>
              </TrackClick>
            )}
          </div>
        </Flex>
      </div>
      {expandPrizes && (
        <ReelRaceScheduleCardPrizes
          formattedPrizes={reelRace.formattedPrizes}
          t={t}
        />
      )}
    </>
  );
}
