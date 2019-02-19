/* @flow */
import React from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { sessionId, country, getLanguage } from "Models/handshake";

import KambiClient, { Betslip } from "Features/sports/components/KambiClient";
import SportsSearch from "Features/sports/components/SportsSearch";
import SportsHashWatcher from "Components/HashWatcher";
import { SportsNav } from "Features/sports/components/SportsNav";
import Modals from "Features/sports/components/Modals";
import { isSearching } from "Features/sports/utils";

import {
  SportsStateProvider,
  ClientContext,
  OPEN_MODAL_MUTATION,
} from "Features/sports/state";

// hook up SportsStateClient to redux data until we can do a proper graphql solution
const ConnectedSportsStateProvider = connect(state => ({
  locale: getLanguage(state).toUpperCase(),
  market: country(state).toUpperCase(),
  sessionId: sessionId(state),
}))(SportsStateProvider);

const HAS_SELECTED_FAVOURITES_QUERY = gql`
  query HasSelectedFavourites {
    hasSelectedFavourites
  }
`;

export class SportsShellContainer extends React.Component<{}> {
  static contextType = ClientContext;

  componentDidMount() {
    // on mount open the choose favourites modal if the user is yet to choose favourites
    this.context.client
      .query({ query: HAS_SELECTED_FAVOURITES_QUERY })
      .then(({ data }) => {
        if (!data.hasSelectedFavourites) {
          this.context.client.mutate({
            mutation: OPEN_MODAL_MUTATION,
            variables: { modal: "CHOOSE_FAVOURITES" },
          });
        }
      });
  }

  render() {
    return (
      <>
        <SportsHashWatcher>
          {({ currentHash }) =>
            isSearching() ? (
              <SportsSearch />
            ) : (
              <SportsNav currentHash={currentHash} />
            )
          }
        </SportsHashWatcher>
        <Betslip />
        <Query query={HAS_SELECTED_FAVOURITES_QUERY}>
          {({ loading }) => (loading ? null : <KambiClient />)}
        </Query>
        <Modals />
      </>
    );
  }
}

export default () => (
  <ConnectedSportsStateProvider>
    <SportsShellContainer />
  </ConnectedSportsStateProvider>
);
