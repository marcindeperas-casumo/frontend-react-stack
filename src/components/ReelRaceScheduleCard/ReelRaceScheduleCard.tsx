import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TournamentIcon, TimeLockedIcon, LaurelIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { DateTime } from "luxon";
import cx from "classnames";
import * as A from "Types/apollo";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { GameThumb } from "Components/GameThumb";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { interpolate } from "Utils";
import { ReelRaceScheduleCardContent } from "./ReelRaceScheduleCardContent";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage;
  expanded: boolean;
};

type TReelRaceStartTimeProps = Pick<
  A.ReelRaceScheduleCard_ReelRaceFragment,
  "startTime" | "promoted" | "translations"
>;

const ReelRaceStartTime = ({
  startTime,
  promoted,
  translations,
}: TReelRaceStartTimeProps) => {
  const isMobile = !useIsScreenMinimumTablet();
  const startTimeDate = DateTime.fromMillis(startTime);
  const isTomorrow = startTimeDate.startOf("day").diffNow("days").valueOf() > 0;

  const getTomorrowOrTodayLabel = () => (
    <Text
      tag="p"
      size="xs"
      className={cx(
        !isMobile && "u-margin-right--sm",
        isMobile && "u-margin-bottom--sm u-text-align-right ",
        promoted ? "text-yellow-30" : "text-grey-50"
      )}
    >
      {isTomorrow ? translations.tomorrow : translations.today}
    </Text>
  );

  return (
    <Flex
      direction={isMobile && "vertical"}
      align={isMobile ? "end" : "center"}
      spacing={isMobile && "none"}
    >
      {isMobile && getTomorrowOrTodayLabel()}
      <Flex align="center">
        <TimeLockedIcon
          size="sm"
          className={cx(
            "u-margin-right--sm",
            promoted ? "text-yellow-30" : "text-grey-50"
          )}
        />
        {!isMobile && getTomorrowOrTodayLabel()}
        <Text
          tag="p"
          size="xs"
          className={cx(
            "u-margin--none u-text-align-right",
            promoted ? "text-yellow-30" : "text-grey-50"
          )}
        >
          {startTimeDate.toFormat("t")}
        </Text>
      </Flex>
    </Flex>
  );
};

export function ReelRaceScheduleCard({
  reelRace,
  t,
  expanded = false,
}: TProps) {
  const [open, setOpen] = React.useState(expanded);
  const { translations } = reelRace;
  const isNotMobile = useIsScreenMinimumTablet();
  const toggle = React.useCallback(() => setOpen(state => !state), [setOpen]);

  return (
    <div className="bg-white o-position--relative t-border-r--md u-margin--md t-elevation--10">
      <Flex
        align="center"
        onClick={toggle}
        className={cx(
          "u-padding--md u-cursor--pointer",
          reelRace.promoted && "bg-purple-80 text-white",
          open
            ? "t-border-r-top-left--md t-border-r-top-right--md"
            : "t-border-r--md"
        )}
      >
        <Flex.Item className="o-flex__item--no-shrink">
          {reelRace.promoted && (
            <LaurelIcon className="o-position--absolute text-yellow-30 bg-black t-border t-border-r-top-left--md t-border-r-bottom-right--md t-border-yellow-30 o-inset-top--none o-inset-left--none u-width--lg u-height--lg u-padding--sm" />
          )}
          <GameThumb
            src={reelRace.game.backgroundImage}
            alt={reelRace.game.name}
            mark={reelRace.game.logo}
            width={60}
            height={60}
          />
        </Flex.Item>
        <Flex.Block className="u-margin-left--md">
          <Flex direction={!isNotMobile && "vertical"}>
            <Flex
              direction={isNotMobile && "vertical"}
              className={cx(isNotMobile && "o-flex--1")}
            >
              <Flex.Block>
                <Text
                  tag="div"
                  className={cx("u-font", !reelRace.promoted && "text-grey-70")}
                >
                  {interpolate(
                    reelRace.promoted
                      ? t?.mobile_promoted_race_title_single
                      : t?.mobile_race_title_single,
                    {
                      name: reelRace.game.name,
                    }
                  )}
                </Text>
              </Flex.Block>
              {!open && isNotMobile && (
                <Flex.Item>
                  <ReelRaceStartTime
                    promoted={reelRace.promoted}
                    startTime={reelRace.startTime}
                    translations={translations}
                  ></ReelRaceStartTime>
                </Flex.Item>
              )}
            </Flex>
            <Flex.Item className={cx(isNotMobile && "o-flex-align--center")}>
              <TournamentIcon
                size="sm"
                className={cx(
                  reelRace.promoted ? "text-yellow-30" : "text-grey-90"
                )}
              />
              <Text
                tag="span"
                className={cx(
                  "u-font-weight-bold u-margin-left--sm",
                  reelRace.promoted ? "text-yellow-30" : "text-grey-90"
                )}
              >
                {reelRace.formattedPrize}
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Block>
        {!open && !isNotMobile && (
          <Flex.Item>
            <ReelRaceStartTime
              promoted={reelRace.promoted}
              startTime={reelRace.startTime}
              translations={translations}
            ></ReelRaceStartTime>
          </Flex.Item>
        )}
      </Flex>
      {open && (
        <ReelRaceScheduleCardContent
          reelRace={reelRace}
          t={t}
          showPrizes={expanded}
        />
      )}
    </div>
  );
}
