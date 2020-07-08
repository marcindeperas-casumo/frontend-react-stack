// @flow
import React from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import {
  GAMES_LIST_HORIZONTAL_JACKPOTS_ITEMS_LIMIT,
  POLL_INTERVAL,
} from "Src/constants";
import { localeSelector } from "Models/handshake";
import Jackpots from "./Jackpots";
import { JackpotsQuery } from "./Jackpots.graphql";

type JackpotsQueryInjectProps = {
  locale: string,
  /** The number of games to show */
  numberOfGames: number,
};

export const JackpotsQueryInject = ({
  locale,
  numberOfGames = GAMES_LIST_HORIZONTAL_JACKPOTS_ITEMS_LIMIT,
}: JackpotsQueryInjectProps) => {
  const { data, loading } = useQuery(JackpotsQuery, {
    pollInterval: POLL_INTERVAL.JACKPOTS,
    variables: { numberOfGames },
  });

  if (loading && !data) {
    return null;
  }

  return (
    <Jackpots
      title={data?.gamesList?.name}
      locale={locale}
      jackpots={data?.gamesList?.games}
    />
  );
};

export const JackpotsContainer = connect(state => ({
  locale: localeSelector(state),
}))(JackpotsQueryInject);
