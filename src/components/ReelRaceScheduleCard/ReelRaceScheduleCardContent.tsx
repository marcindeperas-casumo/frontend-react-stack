import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { Button, ButtonPrimary } from "@casumo/cmp-button";
import { PlayIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import cx from "classnames";
import * as React from "react";
import { interpolate, noop } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { launchGame } from "Services/LaunchGameService";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import DangerousHtml from "Components/DangerousHtml";
import * as A from "Types/apollo";
import { launchModal } from "Services/LaunchModalService";
import { EVENTS, MODALS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackClick from "Components/TrackClick";
import { ReelRaceScheduleCardPrizes } from "./ReelRaceScheduleCardPrizes";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage;
  optIn: () => void;
  showPrizes: boolean;
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
      <Flex direction={!isNotMobile && "vertical"}>
        <Flex.Block className={cx("o-flex--vertical")}>
          <Flex.Item
            className={cx(
              "o-flex--horizontal",
              "u-padding-y--lg",
              isNotMobile && "u-width--1/2 u-margin-left--sm"
            )}
          >
            <Flex
              direction="vertical"
              align="center"
              className="o-flex--1 u-text-align-center"
            >
              <Text className="u-font-weight-bold">
                {DateTime.fromMillis(reelRace.startTime).toFormat("t")}
              </Text>
              <Text
                size="xs"
                className="u-font-weight-bold u-padding-top u-padding-bottom--sm text-grey-50 u-text-transform-uppercase"
              >
                {reelRace.translations.startingIn}
              </Text>
            </Flex>
            <Flex
              direction="vertical"
              align="center"
              className="o-flex--1 u-text-align-center t-border-left t-border-right t-border-grey-5"
            >
              <Text className="u-font-weight-bold">{reelRace.spinLimit}</Text>
              <Text
                size="xs"
                className="u-font-weight-bold u-padding-top u-padding-bottom--sm text-grey-50 u-text-transform-uppercase"
              >
                {reelRace.translations.spins}
              </Text>
            </Flex>
            <Flex
              direction="vertical"
              align="center"
              className="o-flex--1 u-text-align-center"
            >
              <Text className="u-font-weight-bold">
                {reelRace.translations.durationTemplate &&
                  interpolate(reelRace.translations.durationTemplate, {
                    duration: getDuration(),
                  })}
              </Text>
              <Text
                size="xs"
                className="u-font-weight-bold u-padding-top u-padding-bottom--sm text-grey-50 u-text-transform-uppercase"
              >
                {reelRace.translations.duration}
              </Text>
            </Flex>
          </Flex.Item>
          <Flex.Item align={!isNotMobile && "center"}>
            {reelRace.translations.caveatShort &&
              reelRace.translations.caveatShort !== "false" && (
                <Text
                  tag="div"
                  className={cx("text-grey-50 u-margin--lg")}
                  onClick={showCaveatsModal}
                >
                  <DangerousHtml
                    html={interpolate(reelRace.translations.caveatShort, {
                      ctaTermsAndConditions: 'class="text-grey-50"',
                    })}
                  />
                </Text>
              )}
          </Flex.Item>
        </Flex.Block>

        <Flex.Item
          className={cx(
            "o-flex--vertical",
            "o-flex-justify--end",
            "o-flex-align--center@tablet o-flex-align--center@desktop o-flex--vertical@mobile"
          )}
        >
          <Flex
            className={cx(
              "u-margin-top--md u-padding-x--md u-margin-bottom--md",
              !isNotMobile && "u-width--full"
            )}
          >
            <Flex.Block className={cx(!isNotMobile && "o-flex--1")}>
              <Button
                size="md"
                onClick={toggleExpandPrizes}
                className="u-width--full"
              >
                {expandPrizes ? t?.hide_prizes_button : t?.show_prizes_button}
              </Button>
            </Flex.Block>
            <Flex.Block className={cx(!isNotMobile && "o-flex--1")}>
              <div className="u-width--full u-padding-left--md">
                {reelRace.optedIn ? (
                  <TrackClick
                    eventName={disabled.eventName}
                    data={disabled.data}
                  >
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
            </Flex.Block>
          </Flex>
        </Flex.Item>
      </Flex>
      {expandPrizes && (
        <ReelRaceScheduleCardPrizes
          formattedPrizes={reelRace.formattedPrizes}
          t={t}
        />
      )}
    </>
  );
}
