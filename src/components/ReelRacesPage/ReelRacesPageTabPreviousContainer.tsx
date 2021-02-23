import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { ReelRacesPageTabPreviousQuery } from "./ReelRacesPageTabPreviousContainer.graphql";
import type { TReelRacesContentPage } from "./ReelRacesPageContainer";
import { ReelRacesPageTabPrevious } from "./ReelRacesPageTabPrevious";

type Props = {
  t: TReelRacesContentPage | null,
};

export function ReelRacesPageTabPreviousContainer({ t }: Props) {
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

  if (!data && !reelRaces) {
    return null;
  }

  return <ReelRacesPageTabPrevious reelRaces={reelRaces} t={t} />;
}
