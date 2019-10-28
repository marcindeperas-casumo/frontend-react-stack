// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UseValuable, PlayerValuablesQuery } from "./PlayerValuables.graphql";
import { subscribeToItemCreatedEvent } from "./utils";

export function usePlayerValuableList() {
  const { data, loading, refetch } = useQuery<PlayerValuablesQueryQuery, void>(
    PlayerValuablesQuery,
    { returnPartialData: true }
  );
  const [mutateValuable] = useMutation<
    $PropertyType<Mutation, "useValuable">,
    MutationUseValuableArgs
  >(UseValuable);

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
      $ElementType<PlayerValuablesQueryQuery, "player">,
      "valuables"
    >),
    onConsumeValuable: (id: string) =>
      mutateValuable({
        variables: {
          id,
          source: "mobile",
        },
      }),
  };
}
