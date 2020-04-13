// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { type ValuableType } from "Models/valuables";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
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

  const { t } = useTranslationsGql({
    listTitleLabel: "root:mobile.valuables:fields.your_valuables",
    availableListTitleLabel: "root:mobile.valuables:fields.available_valuables",
    usedListTitleLabel: "root:mobile.valuables:fields.active_item_label",
    lockedListTitleLabel: "root:mobile.valuables:fields.locked_valuables",
    hoursLabel: "root:units:fields.hours_abbreviated",
    minutesLabel: "root:units:fields.minutes_abbreviated",
    seeAllLabel: "root:mobile.valuables:fields.see_all_valuables_link",
    noValuablesLabel: "root:mobile.valuables:fields.no_valuables",
    dontUseValuableLabel: "root:mobile.deposit:fields.dont_use_valuable_label",
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
    translations: t,
    valuables: (R.pathOr([], ["player", "valuables"], data): $ElementType<
      $ElementType<PlayerValuablesQuery, "player">,
      "valuables"
    >),
  };
}
