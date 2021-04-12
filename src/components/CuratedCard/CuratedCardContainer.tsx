import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { subscribeToItemExpiredEvent } from "Components/PlayerValuableList/utils";
import { navigateToSportsHash } from "Features/sports/utils";
import { navigateById } from "Services/NavigationService";
import { CuratedCardQuery } from "./CuratedCard.graphql";
import { CuratedCardSkeleton } from "./CuratedCardSkeleton";
import { CuratedCard } from "./CuratedCard";

type Props = {
  className?: string;
  slug: string;
};

export const CuratedCardContainer = ({ className, slug }: Props) => {
  const variables = { slug };
  const { data, loading, refetch } = useQuery<
    A.CuratedCardQuery,
    A.CuratedCardQueryVariables
  >(CuratedCardQuery, {
    variables,
  });

  React.useEffect(() => {
    const handler = subscribeToItemExpiredEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  });

  if (loading && !data) {
    return <CuratedCardSkeleton />;
  }

  return (
    <CuratedCard
      className={className}
      market={data?.session.market}
      curatedCard={data?.curatedCard}
      navigateToSportsHash={navigateToSportsHash}
      navigateById={navigateById}
      onLaunchGame={() =>
        launchGame({ slug: data?.curatedCard?.game?.slug || "" })
      }
    />
  );
};
