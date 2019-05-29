// @flow
import React from "react";
import type { Node } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import { USE_VALUABLE } from "./mutations";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";

// This is far from ideal and is just temporary.
// We need to update the list of player valuables because sometimes they come through Cometd
// channel.
const REFRESH_INTERVAL = 15000;

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const onConsumeValuable = client => (id: string) => {
  client.mutate({
    mutation: USE_VALUABLE,
    variables: {
      id,
      targetSource: "mobile",
    },
  });
};

export const PlayerValuableListHorizontalContainer = () => (
  <PlayerValuablesTypedQuery query={LocalQuery} pollInterval={REFRESH_INTERVAL}>
    {({ loading, error, data }) => {
      const { listTitle, player: { valuables = [] } = {} } = data || {};

      return (
        <ApolloConsumer>
          {client => (
            <PlayerValuableListHorizontal
              error={error}
              loading={loading}
              listTitle={listTitle}
              onConsumeValuable={onConsumeValuable(client)}
              valuables={valuables}
            />
          )}
        </ApolloConsumer>
      );
    }}
  </PlayerValuablesTypedQuery>
);
