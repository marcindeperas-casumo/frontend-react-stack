// @flow
import * as React from "react";
import { Router, Redirect } from "@reach/router";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { getGamePage } from "Models/gameBrowser";
import * as A from "Types/apollo";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GetGameSets.graphql' or its ... Remove this comment to see the full error message
import { GetGameSets } from "./GetGameSets.graphql";
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
const GameDetailsPage = React.lazy(() => import("Components/GameDetails"));

const TopList = () => (
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; slug: string; }' is not assi... Remove this comment to see the full error message
  <ComponentBuilder path="top" slug="built-pages.top-lists-{{market}}" />
);

const keyToUrl = {
  SLOT_MACHINES: "slots",
  TABLE_GAMES: "table",
  LIVE_CASINO: "live-casino",
  JACKPOTS: "jackpots",
};
const hostElementId = "react-host-games-lists";

export const GameBrowser = () => {
  useScrollPositionPersistor();
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
  const { data } = useQuery<A.GetGameSets, _>(GetGameSets);
  const sets = data?.gameSetsList || [];
  const gameBrowserSetsData = sets.map(({ key, ...rest }) => ({
    ...rest,
    key,
    url: keyToUrl[key] || key.toLowerCase(),
  }));
  const redirectTarget = useSelector(getGamePage);

  return (
    <WaitForHostElement hostElementId={hostElementId}>
      <Portal hostElementId={hostElementId}>
        <GameBrowserSets sets={gameBrowserSetsData} />

        <React.Suspense fallback={null}>
          <Router className="u-padding-bottom--2xlg" primary={false}>
            <Redirect path="/" from="/" to={redirectTarget} noThrow />
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
            <TopList path="top" />
            <>
              {sets
                .filter((x, i) => gameBrowserSetsData[i].url)
                .map((x, i) => (
                  <GameListPage
                    key={x.key}
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: string; path: any; set: GetGameSets_g... Remove this comment to see the full error message
                    path={gameBrowserSetsData[i].url}
                    set={x}
                  />
                ))}
            </>
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
            <GameSearch path="search" />
            {/* $FlowIgnore:  missing 'provider' prop will come from ':provider' part in path */}
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
            <ProviderGamesList path="provider/:provider" />
            {/* $FlowIgnore:  missing 'slug' prop will come from ':slug' part in path */}
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
            <GameDetailsPage path="details/:slug" />
          </Router>
        </React.Suspense>
      </Portal>
    </WaitForHostElement>
  );
};
