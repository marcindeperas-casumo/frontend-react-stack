import React from "react";
import GameListSkeleton from "../../components/GameListSkeleton";
import { SKELETON_LIST_MOCK } from "../../constants";

const GameListsSkeleton = () => (
  <div>
    {SKELETON_LIST_MOCK.map(({ id, display }) => (
      <GameListSkeleton
        key={id}
        itemWidth={display === "cards" ? 336 : 180}
        itemRatio={display === "cards" ? 0.96 : 1.2}
        itemGap={display === "cards" ? 16 : 8}
        display={display}
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
