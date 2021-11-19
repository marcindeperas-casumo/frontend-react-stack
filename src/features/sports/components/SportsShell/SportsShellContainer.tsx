import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
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
import { SportsHome } from "Features/sports/components/SportsHome";
import { SportsJackpots } from "Features/sports/components/SportsJackpots";
import Modals from "Features/sports/components/Modals";
import { WelcomeOfferCuratedCard } from "Features/sports/components/WelcomeOfferCuratedCard";
import { SportsCuratedCard } from "Features/sports/components/SportsCuratedCard";
import {
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
  CLOSE_ALL_MODALS_MUTATION,
} from "Models/apollo/mutations";
import { SportsShellQuery } from "Models/apollo/queries";
import * as A from "Types/apollo";
import { VirtualsPage } from "Features/sports/components/Virtuals/VirtualsPage";
import { PromotionDetailPage } from "Features/sports/components/Promotions/PromotionDetailPage";
import { SportsShellDepositWrapper } from "Features/sports/components/SportsShell/SportsShellDepositWrapper";
import { SportsYouWonComponent } from "Features/sports/components/SportsYouWon";
import { showModal } from "Features/sports/components/SportsYouWon/SportsYouWonComponent";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";
import { useMarket, useTranslations } from "Utils/hooks";
import "./SportsShellContainer.scss";

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

// eslint-disable-next-line sonarjs/cognitive-complexity
export const SportsShellContainer: React.FC<{}> = () => {
  const { data, error, loading, refetch } = useQuery<
    A.SportsShellQuery,
    A.SportsShellQueryVariables
  >(SportsShellQuery);

  const client = useApolloClient();
  const market = useMarket();
  const ITEMS_TO_SHOW = 100;

  const t = useTranslations<{ number_of_items_to_show: string }>(
    "sports.sports-home-configuration"
  );

  const [containerOffsetTop, setContainerOffsetTop] = useState(0);
  const [isSportsNavigationFixed, setIsSportsNavigationFixed] = useState(false);

  useEffect(() => {
    const container = document.getElementById("main-content-wrapper");
    if (container) {
      const onScroll = () => {
        const nav = document.getElementById("sports-navigation");
        if (nav) {
          setIsSportsNavigationFixed(container.scrollTop > nav.offsetTop);
        }
      };
      setContainerOffsetTop(container.offsetTop);
      container.addEventListener("scroll", onScroll);

      return () => container.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    bridgeEventHandlers.map(
      ([event, handler]: [string, (c: ApolloClient<{}>) => () => void]) =>
        bridge.on(event, handler(client))
    );
  }, [client]);

  if (loading) {
    return <KambiClientSkeleton />;
  }

  if (error) {
    return <ErrorMessage direction="horizontal" retry={refetch} />;
  }

  const virtualsPrefixHash = "#filter/virtuals";
  const promotionPrefixHash = "#promotions";
  const homeHash = "#home";
  const sportsNavigationOffset = {
    marginTop: isSportsNavigationFixed ? `${containerOffsetTop}px` : 0,
  };

  return (
    <>
      <SportsHashWatcher>
        {({ currentHash }) => (
          <div className="bg-grey-0">
            <SportsShellDepositWrapper />
            {data.isSearchVisible ? (
              <SportsSearch />
            ) : (
              <>
                <div
                  id="sports-navigation"
                  style={sportsNavigationOffset}
                  className={`bg-grey-0 ${
                    isSportsNavigationFixed ? "c-sports-navigation-fixed" : ""
                  }`}
                >
                  <SportsNav
                    currentHash={currentHash}
                    market={market}
                    hasSelectedFavourites={data.hasSelectedFavourites}
                    itemsToShow={
                      parseInt(t.number_of_items_to_show) || ITEMS_TO_SHOW
                    }
                  />
                </div>
                <div
                  className={`${
                    isSportsNavigationFixed
                      ? "c-sports-navigation-spacer-visible"
                      : "u-display--none"
                  }`}
                />
              </>
            )}
            {currentHash === homeHash && !data.isSearchVisible && (
              <SportsHome />
            )}
            {currentHash === homeHash && <SportsJackpots />}
            <WelcomeOfferCuratedCard currentHash={currentHash} />
            <SportsCuratedCard currentHash={currentHash} />
            {showModal(currentHash) && (
              <SportsYouWonComponent currentHash={currentHash} />
            )}
            {currentHash === virtualsPrefixHash && <VirtualsPage />}
            {currentHash.startsWith(promotionPrefixHash) && (
              <PromotionDetailPage currentHash={currentHash} />
            )}
          </div>
        )}
      </SportsHashWatcher>
      <KambiClient />
      <Modals />
      <SportsFooter />
    </>
  );
};
