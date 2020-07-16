// @flow
import * as React from "react";
import { Router, Redirect } from "@reach/router";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { getGamePage } from "Models/gameBrowser";
import * as A from "Types/apollo";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import { TabletAndDesktop, Mobile } from "Components/ResponsiveLayout";
import { GetGameSets } from "./GetGameSets.graphql";
import { TopNavDesktop, TopNavMobile } from "./TopNav";
import { GameBrowserSets } from "./GameBrowserSets";
import { useScrollPositionPersistor } from "./gameBrowserHooks";

const ComponentBuilder = React.lazy(() =>
  import("Components/ComponentBuilder").then(module => ({
    default: module.ComponentBuilder,
  }))
);
const GameSearch = React.lazy(() =>
  import("Components/GameSearch").then(module => ({
    default: module.GameSearch,
  }))
);
const ProviderGamesList = React.lazy(() =>
  import("Components/ProviderGamesList").then(module => ({
    default: module.ProviderGamesList,
  }))
);
const GameListPage = React.lazy(() =>
  import("Components/GameListPage").then(module => ({
    default: module.GameListPage,
  }))
);

const TopList = () => (
  <ComponentBuilder path="top" slug="built-pages.top-lists-{{market}}" />
);

const keyToUrl = {
  SLOT_MACHINES: "slots",
  TABLE_GAMES: "table",
  LIVE_CASINO: "live-casino",
  JACKPOTS: "jackpots",
};
const hostElementId = "react-host-games-lists";
const mobileNav = "react-host-top-nav";
export const GameBrowser = () => {
  useScrollPositionPersistor();
  const { data } = useQuery<A.GetGameSets, _>(GetGameSets);
  const sets = data?.gameSetsList || [];
  const gameBrowserSetsData = sets.map(({ key, ...rest }) => ({
    ...rest,
    key,
    url: keyToUrl[key] || key.toLowerCase(),
  }));
  const redirectTarget = useSelector(getGamePage);

  return (
    <>
      <Mobile>
        <WaitForHostElement hostElementId={mobileNav}>
          <Portal hostElementId={mobileNav}>
            <TopNavMobile />
          </Portal>
        </WaitForHostElement>
      </Mobile>
      <WaitForHostElement hostElementId={hostElementId}>
        <Portal hostElementId={hostElementId}>
          <TabletAndDesktop>
            <TopNavDesktop />
          </TabletAndDesktop>
          <GameBrowserSets sets={gameBrowserSetsData} />
          <React.Suspense fallback={null}>
            <Router className="u-padding-bottom--2xlg">
              <Redirect from="/" to={redirectTarget} noThrow />
              <TopList path="top" />
              <>
                {sets
                  .filter((x, i) => gameBrowserSetsData[i].url)
                  .map((x, i) => (
                    <GameListPage
                      key={x.key}
                      path={gameBrowserSetsData[i].url}
                      set={x}
                    />
                  ))}
              </>
              <GameSearch path="search" />
              {/* $FlowIgnore:  missing 'provider' prop will come from ':provider' part in path */}
              <ProviderGamesList path="provider/:provider" />
            </Router>
          </React.Suspense>
        </Portal>
      </WaitForHostElement>
    </>
  );
};
