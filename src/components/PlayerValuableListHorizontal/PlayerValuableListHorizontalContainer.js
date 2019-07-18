// @flow
import React from "react";
import { Query, Mutation } from "react-apollo";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { UseValuable } from "./mutations.graphql";

// This is far from ideal and is just temporary.
// We need to update the list of player valuables because sometimes they come through Cometd
// channel.
const REFRESH_INTERVAL = 15000;

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const consumeValuableMutation = mutation => (id: string) =>
  mutation({
    variables: {
      id,
      source: "mobile",
    },
  });

export const PlayerValuableListHorizontalContainer = () => (
  <PlayerValuablesTypedQuery
    query={LocalQuery}
    pollInterval={REFRESH_INTERVAL}
    returnPartialData
  >
    {({ loading, error, data }) => {
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
