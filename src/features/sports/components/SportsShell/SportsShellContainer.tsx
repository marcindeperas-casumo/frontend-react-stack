import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import bridge from "Src/DurandalReactBridge";
import {
  REACT_APP_EVENT_MENU_CLOSED,
  REACT_APP_EVENT_MENU_OPENED,
  REACT_APP_EVENT_ON_OVERLAY_CHANGE,
  REACT_APP_SPORTS_SHOW_SEARCH,
} from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import SportsHashWatcher from "Components/HashWatcher";
import KambiClient from "Features/sports/components/KambiClient";
import { SportsFooter } from "Features/sports/components/SportsFooter";
import SportsSearch from "Features/sports/components/SportsSearch";
import { SportsNav } from "Features/sports/components/SportsNav";
import Modals from "Features/sports/components/Modals";
import { WelcomeOfferCuratedCard } from "Features/sports/components/WelcomeOfferCuratedCard";
import { Deposit } from "Components/Payments/Deposit";
import { SportsCuratedCard } from "Features/sports/components/SportsCuratedCard";
import {
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
  CLOSE_ALL_MODALS_MUTATION,
} from "Models/apollo/mutations";
import { SportsShellQuery } from "Models/apollo/queries";
import * as A from "Types/apollo";
import SportsShellSkeleton from "./SportsShellSkeleton";

const bridgeEventHandlers = [
  [
    REACT_APP_EVENT_MENU_CLOSED,
    client => () =>
      client.mutate({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: true },
      }),
  ],
  [
    REACT_APP_EVENT_MENU_OPENED,
    client => () =>
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

export const SportsShellContainer: React.FC<{}> = () => {
  const { data, error, loading, refetch } = useQuery<
    A.SportsShellQuery,
    A.SportsShellQueryVariables
  >(SportsShellQuery);

  const client = useApolloClient();

  useEffect(() => {
    bridgeEventHandlers.map(
      ([event, handler]: [string, (c: ApolloClient<{}>) => () => void]) =>
        bridge.on(event, handler(client))
    );
  }, [client]);

  if (loading) {
    return <SportsShellSkeleton />;
  }

  if (error) {
    return <ErrorMessage direction="horizontal" retry={refetch} />;
  }

  return (
    <>
      <SportsHashWatcher>
        {({ currentHash }) => (
          <div className="t-background-grey-0">
            <Deposit />
            {data.isSearchVisible ? (
              <SportsSearch />
            ) : (
              <SportsNav currentHash={currentHash} />
            )}
            <WelcomeOfferCuratedCard currentHash={currentHash} />
            <SportsCuratedCard currentHash={currentHash} />
          </div>
        )}
      </SportsHashWatcher>
      <KambiClient />
      <Modals />
      <SportsFooter />
    </>
  );
};
