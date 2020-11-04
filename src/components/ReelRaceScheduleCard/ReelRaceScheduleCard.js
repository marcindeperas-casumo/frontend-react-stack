// @flow
import * as React from "react";
import * as A from "Types/apollo";
// import cx from "classnames";
// import Flex from "@casumo/cmp-flex";
// import Text from "@casumo/cmp-text";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { interpolate } from "Utils";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRace,
  t: ReelRacesContentPage,
};

export function ReelRaceScheduleCard({ reelRace, t }: Props) {
  return (
    <div className="t-background-white t-border-r--md u-padding--md u-margin--md t-elevation--10">
      {interpolate(
        reelRace.promoted
          ? t.mobile_promoted_race_title_single
          : t.mobile_race_title_single,
        {
          name: reelRace.game.name,
        }
      )}
    </div>
  );
}
