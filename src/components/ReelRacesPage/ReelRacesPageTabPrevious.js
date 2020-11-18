// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { ReelRacePreviousCard } from "Components/ReelRacePreviousCard/ReelRacePreviousCard";
import { ReelRacesPageTabPreviousQuery } from "./ReelRacesPageTabPrevious.graphql";
import type { ReelRacesContentPage } from "./ReelRacesPage";

type Props = {
  t: ?ReelRacesContentPage,
};

export function ReelRacesPageTabPrevious({ t }: Props) {
  const { data } = useQuery<
    A.ReelRacesPageTabPreviousQuery,
    A.ReelRacesPageTabPreviousQueryVariables
  >(ReelRacesPageTabPreviousQuery, {
    variables: {
      limit: 20,
      previous: true,
    },
  });

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    return (
      <>
        {reelRaces.map((reelRace, i) => (
          <ReelRacePreviousCard key={reelRace.id} reelRace={reelRace} t={t} />
        ))}
      </>
    );
  }

  return null;
}
