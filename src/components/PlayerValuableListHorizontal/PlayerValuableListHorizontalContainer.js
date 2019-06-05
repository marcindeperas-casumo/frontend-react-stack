// @flow
import React from "react";
import { Query, Mutation } from "react-apollo";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
// $FlowIgnore
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";
// $FlowIgnore
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
  <PlayerValuablesTypedQuery query={LocalQuery} pollInterval={REFRESH_INTERVAL}>
    {({ loading, error, data }) => {
      const { translations, player: { valuables = [] } = {} } = data || {};

      return (
        <Mutation mutation={UseValuable}>
          {useValuable => (
            <PlayerValuableListHorizontal
              error={error}
              loading={loading}
              onConsumeValuable={consumeValuableMutation(useValuable)}
              valuables={valuables}
              translations={translations}
            />
          )}
        </Mutation>
      );
    }}
  </PlayerValuablesTypedQuery>
);
