// @flow
import React from "react";
import { Query, Mutation } from "react-apollo";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { UseValuable } from "./mutations.graphql";

export type Props = {
  children?: Function, //set to Function to keep flow happy
};

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const consumeValuableMutation = mutation => (id: string) =>
  mutation({
    variables: {
      id,
      source: "mobile",
    },
  });

export const PlayerValuableListContainer = (props: Props) => {
  const { children } = props;
  return (
    <PlayerValuablesTypedQuery query={LocalQuery} returnPartialData>
      {({ loading, error, refetch, data }) => {
        if (loading) {
          return null;
        }

        const {
          translations: { playerValuableTranslations } = {},
          player: { valuables = [] } = {},
        } = data || {};

        return (
          <Mutation mutation={UseValuable}>
            {useValuable =>
              children &&
              children({
                error,
                loading,
                onConsumeValuable: consumeValuableMutation(useValuable),
                refetch,
                translations: playerValuableTranslations,
                valuables,
              })
            }
          </Mutation>
        );
      }}
    </PlayerValuablesTypedQuery>
  );
};
