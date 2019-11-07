// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import { PlayerValuablesQuery } from "./PlayerValuables.graphql";
import { subscribeToItemCreatedEvent } from "./utils";

export function usePlayerValuableList() {
  const { data, loading, refetch } = useQuery<A.PlayerValuablesQuery, void>(
    PlayerValuablesQuery,
    { returnPartialData: true }
  );

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
