// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { navigateToSportsHash } from "Features/sports/utils";
import { CuratedCardQuery } from "./CuratedCard.graphql";
import { CuratedCardSkeleton } from "./CuratedCardSkeleton";
import { CuratedCard } from "./CuratedCard";

type Props = {
  className?: string,
  slug: string,
};

export const CuratedCardContainer = ({ className, slug }: Props) => {
  const variables = { slug };
  const { data, loading } = useQuery<A.CuratedCardQuery, _>(CuratedCardQuery, {
    variables,
  });

  if (loading) {
    return <CuratedCardSkeleton />;
  }

  return (
    <CuratedCard
      className={className}
      market={data?.session.market}
      curatedCard={data?.curatedCard}
      navigateToSportsHash={navigateToSportsHash}
      onLaunchGame={() =>
        launchGame({ slug: data?.curatedCard?.game?.slug || "" })
      }
    />
  );
};
