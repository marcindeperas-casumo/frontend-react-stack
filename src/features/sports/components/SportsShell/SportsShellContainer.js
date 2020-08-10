// @flow
import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { getApolloContext } from "@apollo/react-hooks";
import bridge from "Src/DurandalReactBridge";
import {
  REACT_APP_EVENT_MENU_CLOSED,
  REACT_APP_EVENT_MENU_OPENED,
  REACT_APP_EVENT_ON_OVERLAY_CHANGE,
  REACT_APP_SPORTS_SHOW_SEARCH,
} from "Src/constants";
import SportsHashWatcher from "Components/HashWatcher";
import KambiClient from "Features/sports/components/KambiClient";
import { SportsFooter } from "Features/sports/components/SportsFooter";
import SportsSearch from "Features/sports/components/SportsSearch";
import SportsTopBar from "Features/sports/components/SportsTopBar";
import { SportsNav } from "Features/sports/components/SportsNav";
import Modals from "Features/sports/components/Modals";
import { WelcomeOfferCuratedCard } from "Features/sports/components/WelcomeOfferCuratedCard";
import { SportsCuratedCard } from "Features/sports/components/SportsCuratedCard";
import {
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
  CLOSE_ALL_MODALS_MUTATION,
} from "Models/apollo/mutations";
import SportsShellSkeleton from "./SportsShellSkeleton";

export const SPORTS_SHELL_QUERY = gql`
  query SportsShellQuery {
    hasSelectedFavourites
    isSearchVisible @client
  }
`;

const bridgeEventHandlers = [
  [
    REACT_APP_EVENT_MENU_CLOSED,
    client => data =>
      client.mutate({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: true },
      }),
  ],
  [
    REACT_APP_EVENT_MENU_OPENED,
    client => data =>
      client.mutate({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: false },
      }),
  ],
  [
    REACT_APP_EVENT_ON_OVERLAY_CHANGE,
    client => route => {
      const isSports = route === undefined;

      if (!isSports) {
        client.mutate({ mutation: CLOSE_ALL_MODALS_MUTATION });
      }
    },
  ],
  [
    REACT_APP_SPORTS_SHOW_SEARCH,
    client => showSearch =>
      client.mutate({ mutation: showSearch ? SHOW_SEARCH : HIDE_SEARCH }),
  ],
];

export class SportsShellContainer extends React.Component<{}> {
  static contextType = getApolloContext();

  componentDidMount() {
    bridgeEventHandlers.map(([event, handler]) =>
      bridge.on(event, handler(this.context.client))
    );
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
                {({ currentHash }) => (
                  <div className="t-background-grey-0">
                    <SportsTopBar
                      currentHash={currentHash}
                      isSearchVisible={data.isSearchVisible}
                    />

                    {/* Top Content Area */}

                    {data.isSearchVisible ? (
                      <SportsSearch />
                    ) : (
                      <SportsNav currentHash={currentHash} />
                    )}

                    <WelcomeOfferCuratedCard />
                    <SportsCuratedCard />
                  </div>
                )}
              </SportsHashWatcher>
              <KambiClient />
              <Modals />
              <SportsFooter />
            </>
          );
        }}
      </Query>
    );
  }
}
