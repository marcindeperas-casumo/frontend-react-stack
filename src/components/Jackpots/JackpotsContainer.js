// @flow
import React from "react";
import { Query } from "react-apollo";
import { path } from "ramda";
import Jackpots from "./Jackpots";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { JackpotsQuery } from "./Jackpots.graphql";

// Refreshing the jackpots by polling the API every 2 seconds.
// This is far from ideal and is just temporary.
// We are only using this until we implement subscribing to the RabbitMQ queues
// in the GraphQL server.
// Related issue: https://github.com/Casumo/Home/issues/26668
const REFRESH_INTERVAL = 3000;

class GamesListJackpotsTypedQuery extends Query<GamesListJackpots, null> {}

const JackpotsApolloContainer = () => (
  <GamesListJackpotsTypedQuery
    query={JackpotsQuery}
    pollInterval={REFRESH_INTERVAL}
  >
    {({ loading, data }) => {
      const getTitle = path(["gamesList", "title"]);
      const getGames = path(["gamesList", "games"]);

      return loading ? null : (
        <Jackpots title={getTitle(data)} jackpots={getGames(data)} />
      );
    }}
  </GamesListJackpotsTypedQuery>
);

export default JackpotsApolloContainer;
