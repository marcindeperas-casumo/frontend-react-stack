// @flow
import React, { type Node } from "react";
import { Mutation } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { UseValuable } from "./mutations.graphql";
import { type PlayerValuableListProps } from "./PlayerValuableList.types";

export type Props = {
  renderList: PlayerValuableListProps => Node,
};

const consumeValuableMutation = mutation => (id: string) =>
  mutation({
    variables: {
      id,
      source: "mobile",
    },
  });

export const PlayerValuableListContainer = (props: Props) => {
  const { renderList } = props;
  const { data, loading, error, refetch } = useQuery(LocalQuery, {
    returnPartialData: true,
  });

  const translations = {
    listTitleLabel: data.listTitleLabel || "",
    availableListTitleLabel: data.availableListTitleLabel || "",
    lockedListTitleLabel: data.lockedListTitleLabel || "",
    hoursLabel: data.hoursLabel || "",
    minutesLabel: data.minutesLabel || "",
    seeAllLabel: data.seeAllLabel || "",
    noValuablesLabel: data.noValuablesLabel || "",
  };

  const { player: { valuables = [] } = {} } = data || {};

  return (
    <Mutation mutation={UseValuable}>
      {useValuable =>
        renderList({
          error,
          loading,
          onConsumeValuable: consumeValuableMutation(useValuable),
          refetch,
          translations,
          valuables,
        })
      }
    </Mutation>
  );
};
