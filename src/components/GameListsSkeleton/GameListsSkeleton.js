import React from "react";
import GameListSkeleton from "Components/GameList/GameListSkeleton";

export const GameListsSkeleton = () => (
  <div>
    {Array.from(Array(4).keys()).map(i => (
      <GameListSkeleton
        key={i}
        itemWidth={170}
        itemRatio={1.2}
        itemGap={8}
        display={"tiles"}
        preserveAspectRatio="xMinYMin"
        colorLow="#eff6f6"
        colorHi="#ffffff"
        className="u-padding-top--lg u-padding-top--xlg@tablet u-padding-top--xlg@desktop
        u-padding-left--md u-padding-left--2xlg@tablet u-padding-left--2xlg@desktop"
      />
    ))}
  </div>
);

export default GameListsSkeleton;
