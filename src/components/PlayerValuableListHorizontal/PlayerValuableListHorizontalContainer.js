// @flow
import React from "react";
import { Query, Mutation } from "react-apollo";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { UseValuable } from "./mutations.graphql";

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const consumeValuableMutation = mutation => (id: string) =>
  mutation({
    variables: {
      id,
      source: "mobile",
    },
  });

export const PlayerValuableListHorizontalContainer = () => (
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
          {useValuable => (
            <PlayerValuableListHorizontal
              error={error}
              loading={loading}
              refetch={refetch}
              onConsumeValuable={consumeValuableMutation(useValuable)}
              valuables={valuables}
              translations={playerValuableTranslations}
            />
          )}
        </Mutation>
      );
    }}
  </PlayerValuablesTypedQuery>
);
