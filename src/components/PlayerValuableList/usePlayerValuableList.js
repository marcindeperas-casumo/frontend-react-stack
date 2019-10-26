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

  return {
    error,
    loading,
    refetch,
    valuables: (R.path(
      ["player", "valuables"],
      data
    ): Array<PlayerValuablesQuery_player_valuables>),
    translations: (R.path(
      ["translations", "playerValuableTranslations"],
      data
    ): ?PlayerValuablesQuery_translations_playerValuableTranslations),
    onConsumeValuable: (id: string) =>
      mutateValuable({
        variables: {
          id,
          source: "mobile",
        },
      }),
  };
}
