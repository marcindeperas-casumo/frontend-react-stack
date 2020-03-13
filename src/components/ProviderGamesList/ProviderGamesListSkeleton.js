// @flow
import React from "react";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

export const ProviderGamesListSkeleton = () => (
  <div className="t-background-chrome-light-2 u-padding-top u-padding-x--md">
    <GameListSkeleton hasTitle={false} />
  </div>
);
