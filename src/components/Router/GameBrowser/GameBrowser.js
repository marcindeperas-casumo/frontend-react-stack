// @flow
import * as React from "react";
import { Router, Redirect } from "@reach/router";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import {
  TabletAndDesktop,
  Mobile,
  isMobile,
} from "Components/ResponsiveLayout";
import { TopNavDesktop, TopNavMobile } from "./TopNav";
import { GameBrowserSets } from "./GameBrowserSets";

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
const LiveCasinoDetailPage = React.lazy(() =>
  import("Components/LiveCasinoDetailPage").then(module => ({
    default: module.LiveCasinoDetailPage,
  }))
);
const LiveCasinoDetailPageDesktop = React.lazy(() =>
  import("Components/LiveCasinoDetailPage").then(module => ({
    default: module.LiveCasinoDetailPageDesktop,
  }))
);
const LiveCasinoPage = isMobile()
  ? LiveCasinoDetailPage
  : LiveCasinoDetailPageDesktop;

const TopList = () => (
  <ComponentBuilder path="top" slug="built-pages.top-lists-{{market}}" />
);

const hostElementId = "react-host-games-lists";
const mobileNav = "react-host-top-nav";
export const GameBrowser = () => (
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
          <GameBrowserSets />
        </TabletAndDesktop>
        <React.Suspense fallback={null}>
          <Router className="u-padding-bottom--2xlg">
            <Redirect from="/" to="top" noThrow />
            <TopList path="top" />
            <GameSearch path="search" />
            <LiveCasinoPage path="live-casino" />
            {/* $FlowIgnore:  missing 'provider' prop will come from ':provider' part in path */}
            <ProviderGamesList path="provider/:provider" />
            <GameListPage path="slots" listId="slotGames" />
            <GameListPage path="table" listId="tableGames" />
            <GameListPage path="jackpots" listId="jackpotGames" />
            <GameListPage
              path="must-drop-jackpots"
              listId="mustDropJackpotGames"
            />
          </Router>
        </React.Suspense>
      </Portal>
    </WaitForHostElement>
  </>
);
