// @flow
import React from "react";
import { ReelRacePreviousCard } from "Components/ReelRacePreviousCard/ReelRacePreviousCard";
import * as A from "Types/apollo";
import type { TReelRacesContentPage } from "./ReelRacesPageContainer";

type Props = {
  t: ?TReelRacesContentPage,
  reelRaces: Array<A.ReelRacesPageTabPreviousQuery_reelRaces>,
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
