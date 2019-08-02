// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  src: string,
  mark: string,
  height?: number,
  width?: number,
  alt?: string | void,
};

export class GameThumb extends PureComponent<Props> {
  render() {
    const { src, mark, width = 56, height = 56, alt = null } = this.props;

    if (!src) {
      return null;
    }

    return (
      <ImageLazy
        className="u-display--block t-border-r--md"
        width={width}
        height={height}
        src={src}
        mark={mark}
        alt={alt}
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
