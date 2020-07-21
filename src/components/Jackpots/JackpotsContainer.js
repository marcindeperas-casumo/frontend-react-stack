// @flow
import React from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
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
  const { data } = useQuery<A.JackpotsQuery, A.JackpotsQueryVariables>(
    JackpotsQuery,
    {
      pollInterval: POLL_INTERVAL.JACKPOTS,
      variables: { numberOfGames },
      fetchPolicy: "network-only", // showing old jackpots (from previous session) could be bad for compliance
    }
  );

  if (data && data.gamesList) {
    return (
      <Jackpots
        title={data.gamesList.name}
        locale={locale}
        jackpots={data.gamesList.games}
      />
    );
  }

  return null;
};

export const JackpotsContainer = connect(state => ({
  locale: localeSelector(state),
}))(JackpotsQueryInject);
