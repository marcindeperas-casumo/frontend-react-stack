// @flow
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import ReelRacesBanner from "Components/ReelRacesBanner";
import { ReelRacesPageTabScheduleContainer } from "Components/ReelRacesPage/ReelRacesPageTabScheduleContainer";
import { ReelRacesPageTabPreviousContainer } from "Components/ReelRacesPage/ReelRacesPageTabPreviousContainer";
import { ReelRacesPageTabs } from "./ReelRacesPageTabs";

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

export function ReelRacesPageContainer() {
  const t = useTranslations<ReelRacesContentPage>(
    "mobile.tournament-campaigns"
  );
  const [activeTab, setActiveTab] = React.useState("SCHEDULE");

  return (
    <>
      <ReelRacesBanner />
      <ReelRacesPageTabs
        t={t}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="u-content-width--tablet-landscape u-padding-y--md">
        {activeTab === "SCHEDULE" && (
          <ReelRacesPageTabScheduleContainer t={t} />
        )}
        {activeTab === "PREVIOUS" && (
          <ReelRacesPageTabPreviousContainer t={t} />
        )}
      </div>
    </>
  );
}
