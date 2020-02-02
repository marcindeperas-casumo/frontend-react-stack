// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
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
      curatedCard={data?.curatedCard}
      onLaunchGame={() =>
        launchGame({ slug: data?.curatedCard?.game?.slug || "" })
      }
    />
  );
};
