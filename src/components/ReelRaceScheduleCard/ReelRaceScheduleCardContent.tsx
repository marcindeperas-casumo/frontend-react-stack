import * as React from "react";
import * as A from "Types/apollo";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { Button } from "@casumo/cmp-button";
import { DateTime } from "luxon";
import { interpolate } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { ReelRaceOptInPlayButton } from "Components/ReelRaceOptInPlayButton";
import DangerousHtml from "Components/DangerousHtml";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";
import { ReelRaceScheduleCardPrizes } from "./ReelRaceScheduleCardPrizes";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage;
  showPrizes: boolean;
};

export function ReelRaceScheduleCardContent({
  reelRace,
  t,
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
                className="u-font-weight-bold u-padding-top u-padding-bottom--sm t-color-grey-50 u-text-transform-uppercase"
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
                className="u-font-weight-bold u-padding-top u-padding-bottom--sm t-color-grey-50 u-text-transform-uppercase"
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
                className="u-font-weight-bold u-padding-top u-padding-bottom--sm t-color-grey-50 u-text-transform-uppercase"
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
                  className={cx("t-color-grey-50 u-margin--lg")}
                  onClick={showCaveatsModal}
                >
                  <DangerousHtml
                    html={interpolate(reelRace.translations.caveatShort, {
                      ctaTermsAndConditions: 'class="t-color-grey-50"',
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
              <ReelRaceOptInPlayButton
                reelRace={reelRace}
                t={t}
              />
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
