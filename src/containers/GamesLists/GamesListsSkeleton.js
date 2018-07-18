import React from "react";
import SkeletonGameTiles from "../../components/SkeletonGameTiles";

export default () => (
  <div>
    {Array.from(Array(4).keys()).map(i => (
      <SkeletonGameTiles
        key={i}
        tileWidth={175}
        tileGap={10}
        tileRadius={8}
        preserveAspectRatio="xMinYMin"
        colorLow="#eff6f6"
        colorHi="#ffffff"
        className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop
        u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      />
    ))}
  </div>
);
