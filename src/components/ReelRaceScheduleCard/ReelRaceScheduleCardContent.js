// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { Button } from "@casumo/cmp-button";
import cx from "classnames";
import { TimeLockedIcon, SpinIcon, AthleticsIcon } from "@casumo/cmp-icons";
import { interpolate } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";
import DangerousHtml from "Components/DangerousHtml";
import * as A from "Types/apollo";
import OptInButton from "Components/OptInButton/OptInButton";
import { EVENTS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
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
    eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
    data: { state: BUTTON_STATE.OPT_IN },
    onClick: optIn,
  };
  const disabled = {
    label: reelRace.translations.optedIn || "",
    eventName: EVENTS.MIXPANEL_REEL_RACE_CLICKED,
    data: { state: BUTTON_STATE.OPTED_IN },
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

      <Flex
        direction={isNotMobile ? "horizontal" : "vertical"}
        className={cx(isNotMobile && "u-margin-left--5xlg")}
        align="center"
      >
        {reelRace.translations.caveatShort &&
          reelRace.translations.caveatShort !== "false" && (
            <Text
              tag="div"
              className="t-color-grey-50 u-padding--md"
              // onClick={showCaveatsModal}
            >
              <DangerousHtml
                html={interpolate(reelRace.translations.caveatShort, {
                  ctaTermsAndConditions: 'class="t-color-grey-50"',
                })}
              />
            </Text>
          )}
        <Flex justify="end" className="o-flex--1 u-margin--lg">
          <Button size="md" onClick={toggleExpandPrizes}>
            {expandPrizes ? t?.hide_prizes_button : t?.show_prizes_button}
          </Button>
          <div className="u-margin-left--md">
            <OptInButton
              active={active}
              disabled={disabled}
              isOptedIn={reelRace.optedIn}
            />
          </div>
        </Flex>
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
