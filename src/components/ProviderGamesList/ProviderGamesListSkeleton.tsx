import React from "react";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import {
  leftPaddingClasses,
  topMarginClasses,
} from "Components/GameListHorizontal/constants";

export const ProviderGamesListSkeleton = () => (
  <div className={`o-wrapper ${leftPaddingClasses} ${topMarginClasses}`}>
    <GameListSkeleton hasTitle={false} />
  </div>
);
