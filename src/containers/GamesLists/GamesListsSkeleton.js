import React from "react";
import SkeletonGameTiles from "../../components/SkeletonGameTiles";

export default () => (
  <div>
    {Array.from(Array(4).keys()).map(i => (
      <SkeletonGameTiles
        key={i}
        tileWidth={170}
        tileHeight={204}
        preserveAspectRatio="none"
        className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop
        u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      />
    ))}
  </div>
);
