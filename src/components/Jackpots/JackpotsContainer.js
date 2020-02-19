// @flow
import React from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import { localeSelector } from "Models/handshake";
import Jackpots from "./Jackpots";
import { JackpotsQuery } from "./Jackpots.graphql";

// Refreshing the jackpots by polling the API every 30 seconds.
// This is far from ideal and is just temporary.
// We are only using this until we implement subscribing to the RabbitMQ queues
// in the GraphQL server.
// Related issue: https://github.com/Casumo/Home/issues/26668
const pollInterval = 30000;

type JackpotsQueryInjectProps = {
  locale: string,
  /** The number of games to show */
  number: number,
};

export const JackpotsQueryInject = ({
  locale,
  // As jackpots are shown 3 by  3, we want the "number" to be a multiple of 3
  number = GAMES_LIST_HORIZONTAL_ITEMS_LIMIT + 1,
}: JackpotsQueryInjectProps) => {
  const { data, loading } = useQuery(JackpotsQuery, {
    pollInterval,
    variables: { number },
  });

  return loading ? null : (
    <Jackpots
      title={data?.name}
      locale={locale}
      jackpots={data?.gamesList?.games}
    />
  );
};

export const JackpotsContainer = connect(state => ({
  locale: localeSelector(state),
}))(JackpotsQueryInject);
