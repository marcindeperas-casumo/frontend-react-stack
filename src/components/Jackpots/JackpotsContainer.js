// @flow
import React from "react";
import { path } from "ramda";
import { useQuery } from "@apollo/react-hooks";
import Jackpots from "./Jackpots";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { JackpotsQuery } from "./Jackpots.graphql";

// Refreshing the jackpots by polling the API every 30 seconds.
// This is far from ideal and is just temporary.
// We are only using this until we implement subscribing to the RabbitMQ queues
// in the GraphQL server.
// Related issue: https://github.com/Casumo/Home/issues/26668
const pollInterval = 30000;

export const JackpotsContainer = () => {
  const { data, loading } = useQuery(JackpotsQuery, { pollInterval });
  const getTitle = path(["gamesList", "title"]);
  const getGames = path(["gamesList", "games"]);

  return loading ? null : (
    <Jackpots title={getTitle(data)} jackpots={getGames(data)} />
  );
};
