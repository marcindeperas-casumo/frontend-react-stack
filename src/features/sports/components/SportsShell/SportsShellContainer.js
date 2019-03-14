/* @flow */
import React from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import bridge from "Src/DurandalReactBridge";
import {
  KO_APP_EVENT_MENU_OPENED,
  KO_APP_EVENT_MENU_CLOSED,
} from "Src/constants";
import { sessionId, country, getLanguage } from "Models/handshake";
import SportsHashWatcher from "Components/HashWatcher";
import KambiClient from "Features/sports/components/KambiClient";
import SportsSearch from "Features/sports/components/SportsSearch";
import { SportsNav } from "Features/sports/components/SportsNav";
import Modals from "Features/sports/components/Modals";
import {
  SportsStateProvider,
  ClientContext,
  OPEN_MODAL_MUTATION,
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
} from "Features/sports/state";
import SportsShellSkeleton from "./SportsShellSkeleton";

// hook up SportsStateClient to redux data until we can do a proper graphql solution
const ConnectedSportsStateProvider = connect(state => ({
  locale: getLanguage(state).toUpperCase(),
  market: country(state).toUpperCase(),
  sessionId: sessionId(state),
}))(SportsStateProvider);

const SPORTS_SHELL_QUERY = gql`
  query SportsShellQuery {
    hasSelectedFavourites
    searchVisible @client
  }
`;

export class SportsShellContainer extends React.Component<{}> {
  static contextType = ClientContext;

  componentDidMount() {
    bridge.on("sports-show-search", showSearch => {
      const mutation = showSearch ? SHOW_SEARCH : HIDE_SEARCH;

      this.context.client.mutate({ mutation });
    });

    bridge.on(KO_APP_EVENT_MENU_CLOSED, data =>
      this.context.client.mutate({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: true },
      })
    );

    bridge.on(KO_APP_EVENT_MENU_OPENED, data =>
      this.context.client.mutate({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: false },
      })
    );

    // on mount open the choose favourites modal if the user is yet to choose favourites
    this.context.client
      .query({ query: SPORTS_SHELL_QUERY })
      .then(({ data }) => {
        if (!data.hasSelectedFavourites) {
          // bug in apollo client is making a timeout necessary here, @adampilks - remove when we can
          setTimeout(() => {
            this.context.client.mutate({
              mutation: OPEN_MODAL_MUTATION,
              variables: { modal: "CHOOSE_FAVOURITES" },
            });
          }, 100);
        }
      });
  }

  render() {
    return (
      <Query query={SPORTS_SHELL_QUERY}>
        {({ loading, data, error }) => {
          if (loading || error) {
            return <SportsShellSkeleton />;
          }
          return (
            <>
              <SportsHashWatcher>
                {({ currentHash }) =>
                  data.searchVisible ? (
                    <SportsSearch />
                  ) : (
                    <SportsNav currentHash={currentHash} />
                  )
                }
              </SportsHashWatcher>
              {data.hasSelectedFavourites ? <KambiClient /> : null}
              <Modals />
            </>
          );
        }}
      </Query>
    );
  }
}

export default () => (
  <ConnectedSportsStateProvider>
    <SportsShellContainer />
  </ConnectedSportsStateProvider>
);
