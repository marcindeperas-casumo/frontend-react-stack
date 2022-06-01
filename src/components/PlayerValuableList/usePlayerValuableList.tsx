import { useQuery } from "@apollo/client";
import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import type { ValuableListParameters } from "Models/valuables";
import { gamificationFeaturesApi } from "Models/gamificationFeatures";
import { PlayerValuablesQuery } from "./PlayerValuables.graphql";
import { subscribeToItemCreatedEvent } from "./utils";

export function usePlayerValuableList({
  valuableType,
  badgeRuleName,
  className,
  minDepositAmount,
}: ValuableListParameters = {}) {
  const variables = {
    valuableType,
    badgeRuleName,
    className,
    minDepositAmount,
  };

  const { data: gamificationFeatures, isFetching } =
    gamificationFeaturesApi.useGetGamificationFeaturesQuery();

  const canPlayerSeeValuables = gamificationFeatures?.valuableUsage;

  const { data, loading, refetch } = useQuery<
    A.PlayerValuablesQuery,
    A.PlayerValuablesQueryVariables
  >(PlayerValuablesQuery, {
    skip: isFetching || !canPlayerSeeValuables,
    fetchPolicy: "no-cache",
    variables,
  });

  React.useEffect(() => {
    const handler = subscribeToItemCreatedEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  });

  return {
    loading,
    translations: R.omit(["player"], data),
    valuables: R.pathOr(
      [],
      ["player", "valuables"],
      data
    ) as A.PlayerValuablesQuery["player"]["valuables"],
  };
}
