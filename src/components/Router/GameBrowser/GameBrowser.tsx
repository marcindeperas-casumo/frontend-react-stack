import { useQuery } from "@apollo/client";
import * as React from "react";
import { Router, Redirect } from "@reach/router";
import { useSelector } from "react-redux";
import { getGamePage } from "Models/gameBrowser";
import * as A from "Types/apollo";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
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
  const { data } = useQuery<A.GetGameSetsQuery, A.GetGameSetsQueryVariables>(
    GetGameSets
  );
  const sets = data?.gameSetsList || [];
  const gameBrowserSetsData = sets.map(({ key, ...rest }) => ({
    ...rest,
    key,
    url: keyToUrl[key] || key.toLowerCase(),
  }));
  const redirectTarget = useSelector(getGamePage) as string;

  return (
    <WaitForHostElement hostElementId={hostElementId}>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; hostElementId: string... Remove this comment to see the full error message */}
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
                    path={gameBrowserSetsData[i].url}
                    set={x}
                  />
                ))}
            </>
            <GameSearch path="search" />
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
            <ProviderGamesList path="provider/:provider" />
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
            <GameDetailsPage path="details/:slug" />
          </Router>
        </React.Suspense>
      </Portal>
    </WaitForHostElement>
  );
};
