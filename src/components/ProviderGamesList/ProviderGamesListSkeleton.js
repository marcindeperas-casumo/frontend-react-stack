// @flow
import React from "react";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

export const ProviderGamesListSkeleton = () => (
  <div className="t-background-grey-0 u-padding-top u-padding-x--md">
    <GameListSkeleton hasTitle={false} />
  </div>
);
