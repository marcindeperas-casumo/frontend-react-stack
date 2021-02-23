// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../models/valuables"' has no exported ... Remove this comment to see the full error message
import { type ValuableType } from "Models/valuables";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './PlayerValuables.graphql' or ... Remove this comment to see the full error message
import { PlayerValuablesQuery } from "./PlayerValuables.graphql";
import { subscribeToItemCreatedEvent } from "./utils";

export function usePlayerValuableList(valuableType?: ValuableType) {
  const variables = { valuableType };
  const { data, loading, refetch } = useQuery<
    A.PlayerValuablesQuery,
    A.PlayerValuablesQueryVariables
  >(PlayerValuablesQuery, {
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

  // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
  return {
    loading,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    translations: R.omit("player", data),
    valuables: (R.pathOr([], ["player", "valuables"], data): $ElementType<
      $ElementType<PlayerValuablesQuery, "player">,
      "valuables"
    >),
  };
}
