// @flow
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { path } from "ramda";
import GameRowGameFragment from "Components/GameRow/GameRow.graphql";
import Jackpots from "./Jackpots";

// Refreshing the jackpots by polling the API every 2 seconds.
// This is far from ideal and is just temporary.
// We are only using this until we implement subscribing to the RabbitMQ queues
// in the GraphQL server.
// Related issue: https://github.com/Casumo/Home/issues/26668
const REFRESH_INTERVAL = 3000;

export const GET_JACKPOTS = gql`
  query GamesListJackpots {
    gamesList(listId: "casumoJackpotGames") {
      title
      games {
        ...GameRowGame
      }
    }
  }

  ${GameRowGameFragment}
`;

class GamesListJackpotsTypedQuery extends Query<GamesListJackpots, null> {}

const JackpotsApolloContainer = () => (
  <GamesListJackpotsTypedQuery
    query={GET_JACKPOTS}
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
