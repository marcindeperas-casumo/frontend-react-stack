// @flow
import * as React from "react";
import { ReelRacePreviousCard } from "Components/ReelRacePreviousCard/ReelRacePreviousCard";
import * as A from "Types/apollo";
import type { TReelRacesContentPage } from "./ReelRacesPageContainer";

type Props = {
  t: ?TReelRacesContentPage,
  reelRaces: Array<A.ReelRacesPageTabPreviousQuery_reelRaces>,
};

export const ReelRacesPageTabPrevious = React.memo<Props>(
  ({ t, reelRaces }) => (
    <>
      {reelRaces.map(reelRace => (
        <ReelRacePreviousCard key={reelRace.id} reelRace={reelRace} t={t} />
      ))}
    </>
  )
);
