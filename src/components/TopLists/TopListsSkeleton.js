/* @flow */
import React from "react";
import GameListSkeleton from "Components/GameList/GameListSkeleton";

export default function TopListsSkeleton() {
  return (
    <div>
      {Array.from(Array(4).keys()).map(i => (
        <GameListSkeleton key={i} />
      ))}
    </div>
  );
}
