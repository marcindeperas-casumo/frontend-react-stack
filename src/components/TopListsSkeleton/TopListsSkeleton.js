/* @flow */
import React from "react";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";

export const TopListsSkeleton = () => (
  <div>
    {Array.from(Array(4).keys()).map(i => (
      <GameListHorizontalSkeleton key={i} />
    ))}
  </div>
);
