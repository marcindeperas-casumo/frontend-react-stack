// @flow
import * as React from "react";
import { Router, Redirect } from "@reach/router";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import { TabletAndDesktop, Mobile } from "Components/ResponsiveLayout";
import { TopNavDesktop, TopNavMobile } from "./TopNav";

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
const MustDropJackpotList = React.lazy(() =>
  import("Components/MustDropJackpotList")
);
const ProviderGamesList = React.lazy(() =>
  import("Components/ProviderGamesList").then(module => ({
    default: module.ProviderGamesList,
  }))
);
const LiveCasinoDetailPage = React.lazy(() =>
  import("Components/LiveCasinoDetailPage").then(module => ({
    default: module.LiveCasinoDetailPage,
  }))
);

const TopList = () => (
  <ComponentBuilder path="top" slug="built-pages.top-lists-{{market}}" />
);

const hostElementId = "react-host-games-lists";
const mobileNav = "react-host-top-nav";
export const GameBrowser = () => {
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
          <React.Suspense fallback={<div>Loading...</div>}>
            <Router className="u-padding-bottom--2xlg">
              <Redirect from="/" to="top" noThrow />
              <TopList path="top" />
              <GameSearch path="search" />
              <MustDropJackpotList path="must-drop-jackpots" />
              {/* $FlowIgnore:  missing 'provider' prop will come from ':provider' part in path */}
              <ProviderGamesList path="provider/:provider" />
              <LiveCasinoDetailPage path="live-casino" />
            </Router>
          </React.Suspense>
        </Portal>
      </WaitForHostElement>
    </>
  );
};
// eslint-disable-next-line fp/no-mutation
GameBrowser.defaultProps = {
  path: "games/*",
};
