import React from "react";
import GameListSkeleton from "Components/GameList/GameListSkeleton";

const GameListsSkeleton = () => (
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
        className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop
        u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      />
    ))}
  </div>
);

export default GameListsSkeleton;
