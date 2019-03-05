// @flow
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { compose, prop } from "ramda";
import Jackpots from "./Jackpots";

// Refreshing the jackpots by polling the API every 2 seconds.
// This is far from ideal and is just temporary.
// We are only using this until we implement subscribing to the RabbitMQ queues
// in the GraphQL server.
const REFRESH_INTERVAL = 2000;

export const GET_JACKPOTS = gql`
  query {
    gamesList(listId: "casumoJackpotGames") {
      title
      games {
        slug
        name
        logo
        logoBackground
        jackpotInfo {
          id
          formattedJackpotAmount
        }
      }
    }
  }
`;

const JackpotsApolloContainer = () => (
  <Query query={GET_JACKPOTS} pollInterval={REFRESH_INTERVAL}>
    {({ loading, data }) => {
      const getTitle = compose(
        prop("title"),
        prop("gamesList")
      );
      const getGames = compose(
        prop("games"),
        prop("gamesList")
      );

      return loading ? null : (
        <Jackpots title={getTitle(data)} jackpots={getGames(data)} />
      );
    }}
  </Query>
);

export default JackpotsApolloContainer;
