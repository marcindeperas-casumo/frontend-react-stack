// @flow
// import * as React from "react";
import * as R from "ramda";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  PLAYER_VALUABLES_QUERY,
  USE_VALUABLE_MUTATION,
} from "./playerValuableGQL";

export function usePlayerValuableList() {
  const { data, loading, error, refetch } = useQuery<
    PlayerValuablesQuery,
    void
  >(PLAYER_VALUABLES_QUERY, {
    returnPartialData: true,
  });
  const [mutateValuable] = useMutation<UseValuable, UseValuableVariables>(
    USE_VALUABLE_MUTATION
  );

  const translations = {
    listTitleLabel: data?.listTitleLabel || "",
    availableListTitleLabel: data?.availableListTitleLabel || "",
    lockedListTitleLabel: data?.lockedListTitleLabel || "",
    hoursLabel: data?.hoursLabel || "",
    minutesLabel: data?.minutesLabel || "",
    seeAllLabel: data?.seeAllLabel || "",
    // $FlowIgnore: Either type is wrong or it really doesn't exist @dave
    noValuablesLabel: data?.noValuablesLabel || "",
  };

  return {
    error,
    loading,
    refetch,
    translations,
    valuables: (R.path(
      ["player", "valuables"],
      data
    ): Array<PlayerValuablesQuery_player_valuables>),
    onConsumeValuable: (id: string) =>
      mutateValuable({
        variables: {
          id,
          source: "mobile",
        },
      }),
  };
}
