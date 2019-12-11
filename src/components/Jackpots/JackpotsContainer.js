// @flow
import React from "react";
import { path } from "ramda";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
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
};

export const JackpotsQueryInject = ({ locale }: JackpotsQueryInjectProps) => {
  const { data, loading } = useQuery(JackpotsQuery, { pollInterval });
  const getTitle = path(["gamesList", "title"]);
  const getGames = path(["gamesList", "games"]);

  return loading ? null : (
    <Jackpots
      title={getTitle(data)}
      locale={locale}
      jackpots={getGames(data)}
    />
  );
};

export const JackpotsContainer = connect(state => ({
  locale: localeSelector(state),
}))(JackpotsQueryInject);
