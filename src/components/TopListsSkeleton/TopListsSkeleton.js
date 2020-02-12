/* @flow */
import React from "react";
import { times } from "ramda";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";

export const TopListsSkeleton = () => (
  <div>
    {times(
      i => (
        <GameListHorizontalSkeleton key={i} />
      ),
      4
    )}
  </div>
);
