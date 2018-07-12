import React from "react";
import SkeletonGameTiles from "../../components/SkeletonGameTiles";

export default () => (
  <div className="u-padding-bottom--semi@mobile">
    {Array.from(Array(4).keys()).map(i => (
      <SkeletonGameTiles
        key={i}
        tileWidth={170}
        tileHeight={204}
        preserveAspectRatio="none"
        className="u-padding-top--semi u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      />
    ))}
  </div>
);
