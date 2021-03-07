// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { subscribeToItemExpiredEvent } from "Components/PlayerValuableList/utils";
import { navigateToSportsHash } from "Features/sports/utils";
import { navigateById } from "Services/NavigationService";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CuratedCard.graphql' or its ... Remove this comment to see the full error message
import { CuratedCardQuery } from "./CuratedCard.graphql";
import { CuratedCardSkeleton } from "./CuratedCardSkeleton";
import { CuratedCard } from "./CuratedCard";

type Props = {
  className?: string,
  slug: string,
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
