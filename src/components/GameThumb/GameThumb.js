// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  src: string,
  mark: string,
  height?: number,
  width?: number,
};

class GameThumb extends PureComponent<Props> {
  render() {
    const { src, mark, width = 56, height = 56 } = this.props;

    return (
      <ImageLazy
        className="u-display--block t-border-r--16"
        width={width}
        height={height}
        src={src}
        mark={mark}
        dpr={3}
        imgixOpts={{
          w: width,
          h: height,
          fit: "crop",
          crop: "top,left",
          markscale: 100,
        }}
      />
    );
  }
}

export default GameThumb;
