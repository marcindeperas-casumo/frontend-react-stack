// @flow
import * as React from "react";
import { ReelRacesPageTabs } from "Components/ReelRacesPage/ReelRacesPageTabs";
import { ReelRacesPageTabSchedule } from "Components/ReelRacesPage/ReelRacesPageTabSchedule";
import { ReelRacesPageTabPrevious } from "Components/ReelRacesPage/ReelRacesPageTabPrevious";
import { ReelRaceScheduleCard } from "Components/ReelRaceScheduleCard/ReelRaceScheduleCard";
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

export function ReelRaces() {
  const [activeTab, setActiveTab] = React.useState("SCHEDULE");

  return (
    <>
      <ReelRacesPageTabs
        t={t}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="u-content-width--tablet-landscape u-padding-y--md">
        {activeTab === "SCHEDULE" && (
          <ReelRacesPageTabSchedule
            reelRaces={reelRacesSchedule}
            t={t}
            cardComponent={ReelRaceScheduleCard}
          />
        )}
        {activeTab === "PREVIOUS" && (
          <ReelRacesPageTabPrevious reelRaces={reelRacesPrevious} t={t} />
        )}
      </div>
    </>
  );
}
