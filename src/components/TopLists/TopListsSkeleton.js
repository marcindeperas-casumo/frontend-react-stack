/* @flow */
import React from "react";
import GameListHorizontalSkeleton from "Components/GameListHorizontal/GameListHorizontalSkeleton";

export default function TopListsSkeleton() {
  return (
    <div>
      {Array.from(Array(4).keys()).map(i => (
        <GameListHorizontalSkeleton key={i} />
      ))}
    </div>
  );
}
