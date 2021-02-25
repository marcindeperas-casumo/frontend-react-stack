// @flow
import React from "react";
import { ReelRacePreviousCard } from "Components/ReelRacePreviousCard/ReelRacePreviousCard";
import type { ReelRacesContentPage } from "./ReelRacesPageContainer";

type Props = {
  t: ?ReelRacesContentPage,
  reelRaces: any,
};

export function ReelRacesPageTabPrevious({ t, reelRaces }: Props) {
  return (
    <>
      {reelRaces.map((reelRace, i) => (
        <ReelRacePreviousCard key={reelRace.id} reelRace={reelRace} t={t} />
      ))}
    </>
  );
}
