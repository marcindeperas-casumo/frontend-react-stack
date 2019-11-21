import React from "react";
import LazyPortal from "Components/LazyPortal";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import SearchInputSkeleton from "Components/SearchInput/SearchInputSkeleton";

export const LazyGameSearch = props => (
  <LazyPortal
    hostElementId="react-host-games-search"
    loader={() => import("Components/GameSearch")}
    fallback={
      <>
        <SearchInputSkeleton />
        <GameListSkeleton
          className="u-padding-x--md"
          hasTitle={false}
          titleYOffset={20}
        />
      </>
    }
    namedExport="GamesSearch"
    props={props}
  />
);
