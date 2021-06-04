import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Redirect, Router } from "@reach/router";
import * as A from "Types/apollo";
import { getGamePage } from "Models/gameBrowser";
import ComponentBuilder from "Components/ComponentBuilder";
import { GameListPage } from "Components/GameListPage";
import { GetGameSets } from "../GameBrowser/GetGameSets.graphql";
import { LiveCasinoSets } from "./LiveCasinoSets";

const GameSearch = React.lazy(() =>
  import("Components/GameSearch").then(module => ({
    default: module.GameSearch,
  }))
);
export const LiveCasinoGames = (props: { path: string }) => {
  const { data } = useQuery<A.GetGameSetsQuery, A.GetGameSetsQueryVariables>(
    GetGameSets,
    {
      variables: {
        verticalId: "LIVE_CASINO",
      },
    }
  );

  const gameSets = (data?.gameSetsList || []).map(({ key, ...rest }) => ({
    ...rest,
    key,
    url: key.toLowerCase(),
  }));

  const redirectTarget =
    (useSelector(getGamePage(props.path)) as string) || "top";

  return (
    <div className="u-padding-bottom--2xlg">
      <LiveCasinoSets sets={gameSets} />

      <Router primary={false}>
        <Redirect path="/" from="/" to={redirectTarget} noThrow />
        <>
          {gameSets
            .filter(set => set.url)
            .map(set => (
              <GameListPage
                key={set.key}
                path={set.url}
                set={set}
                parent={props.path}
              />
            ))}
        </>

        <ComponentBuilder
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; slug: string; }' is not assi... Remove this comment to see the full error message
          path="top"
          slug="built-pages.live-casino-{{market}}"
        />
        <GameSearch path="search" />
      </Router>
    </div>
  );
};
