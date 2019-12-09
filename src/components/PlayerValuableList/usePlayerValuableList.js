// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { type ValuableType } from "Models/valuables";
import { PlayerValuablesQuery } from "./PlayerValuables.graphql";
import { subscribeToItemCreatedEvent } from "./utils";

export function usePlayerValuableList(valuableType?: ValuableType) {
  const variables = { valuableType };
  const { data, loading, refetch } = useQuery<
    A.PlayerValuablesQuery,
    A.PlayerValuablesQueryVariables
  >(PlayerValuablesQuery, {
    returnPartialData: true,
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

  const translations = {
    listTitleLabel: data?.listTitleLabel || "",
    availableListTitleLabel: data?.availableListTitleLabel || "",
    lockedListTitleLabel: data?.lockedListTitleLabel || "",
    hoursLabel: data?.hoursLabel || "",
    minutesLabel: data?.minutesLabel || "",
    seeAllLabel: data?.seeAllLabel || "",
    noValuablesLabel: data?.noValuablesLabel || "",
    dontUseValuableLabel: data?.dontUseValuableLabel || "",
  };

  return {
    loading,
    translations,
    valuables: (R.pathOr([], ["player", "valuables"], data): $ElementType<
      $ElementType<PlayerValuablesQuery, "player">,
      "valuables"
    >),
  };
}
