import * as React from "react";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import * as A from "Types/apollo";
import { useReelRaceOptIn } from "Utils/hooks/useReelRaceOptIn";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";
type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage | null;
  expanded: boolean;
};

export function ReelRaceScheduleCardContainer({
  reelRace,
  t,
  expanded = false,
}: TProps) {
  const { optInAction } = useReelRaceOptIn(reelRace);
  return (
    <ReelRaceScheduleCard
      expanded={expanded}
      optInForReelRace={optInAction}
      reelRace={reelRace}
      t={t}
    />
  );
}
