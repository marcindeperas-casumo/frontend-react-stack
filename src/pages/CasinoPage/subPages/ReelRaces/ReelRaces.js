// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { ReelRacesPageTabSchedule } from "./ReelRacesPageTabSchedule";
import { ReelRacesPageTabPrevious } from "./ReelRacesPageTabPrevious";
import { t, reelRacesSchedule, reelRacesPrevious } from "./__mocks__";

export type ReelRacesContentPage = {
  schedule_tab_title: string,
  previous_winners_tab_title: string,
  mobile_promoted_race_title_single: string,
  mobile_race_title_single: string,
  today: string,
  tomorrow: string,
  points_template: string,
  right_now: string,
  up_next: string,
  later_today: string,
  show_prizes_button: string,
  hide_prizes_button: string,
  hide_leaderboard_button: string,
  show_leaderboard_button: string,
  show_more_reel_races: string,
  leaderboard_rank: string,
};

type Tabs = "SCHEDULE" | "PREVIOUS";
const TABS = {
  SCHEDULE: "SCHEDULE",
  PREVIOUS: "PREVIOUS",
};

export function ReelRacesPage() {
  const [activeTab, setActiveTab] = React.useState<Tabs>(TABS.SCHEDULE);
  const isNotMobile = useIsScreenMinimumTablet();

  return (
    <div className="t-background-grey-0">
      <div className="u-content-width--tablet-landscape u-padding-y--md">
        <Flex
          justify="center"
          spacing="none"
          className={cx(
            "t-background-white u-font-weight-bold",
            isNotMobile &&
              "t-border-r-top-left--md t-border-r-top-right--md u-margin-x--md"
          )}
        >
          <Flex.Block
            onClick={() => setActiveTab(TABS.SCHEDULE)}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === TABS.SCHEDULE
                ? "t-border-purple-60 t-color-purple-60"
                : "t-border-grey-20 t-color-grey-20 u-cursor-pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.schedule_tab_title}
            </Text>
          </Flex.Block>
          <Flex.Block
            onClick={() => setActiveTab(TABS.PREVIOUS)}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === TABS.PREVIOUS
                ? "t-border-purple-60 t-color-purple-60"
                : "t-border-grey-20 t-color-grey-20 u-cursor-pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.previous_winners_tab_title}
            </Text>
          </Flex.Block>
        </Flex>

        {activeTab === TABS.SCHEDULE && (
          <ReelRacesPageTabSchedule t={t} reelRaces={reelRacesSchedule} />
        )}
        {activeTab === TABS.PREVIOUS && (
          <ReelRacesPageTabPrevious t={t} reelRaces={reelRacesPrevious} />
        )}
      </div>
    </div>
  );
}
