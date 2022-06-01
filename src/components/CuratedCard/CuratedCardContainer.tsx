import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { countrySelector } from "Models/handshake";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { subscribeToItemExpiredEvent } from "Components/PlayerValuableList/utils";
import { navigateToSportsHash } from "Features/sports/utils";
import { navigateById } from "Services/NavigationService";
import { CuratedCard } from "./CuratedCard";
import { CuratedCardSkeleton } from "./CuratedCardSkeleton";
import { CuratedCardQuery } from "./CuratedCard.graphql";

type Props = {
  className?: string;
  slug: string;
};

export const CuratedCardContainer = ({ className, slug }: Props) => {
  const variables = { slug };
  const {
    data: slugGqlData,
    loading,
    refetch,
  } = useQuery<A.CuratedCardQuery, A.CuratedCardQueryVariables>(
    CuratedCardQuery,
    {
      variables,
    }
  );
  const playerCountry = useSelector(countrySelector);

  useEffect(() => {
    const handler = subscribeToItemExpiredEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  });

  if (playerCountry === "nl") {
    return null;
  }

  if (loading || !slugGqlData) {
    return <CuratedCardSkeleton />;
  }

  return (
    <CuratedCard
      className={className}
      market={slugGqlData?.session?.market}
      curatedCard={slugGqlData?.curatedCard}
      navigateToSportsHash={navigateToSportsHash}
      navigateById={navigateById}
      onLaunchGame={() =>
        launchGame({ slug: slugGqlData?.curatedCard?.game?.slug || "" })
      }
    />
  );
};
