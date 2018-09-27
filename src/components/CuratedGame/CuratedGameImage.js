import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";

export default class CuratedGameImage extends PureComponent<Props> {
  render() {
    const { className, data } = this.props;
    const breakpoints = [
      "(max-width: 479px)",
      "(max-width: 767px)",
      "(min-width: 768px)",
    ];
    const images = [
      data.fields.small_image,
      data.fields.medium_image,
      data.fields.large_image,
    ].map((image, i) => {
      return {
        mediaQuery: breakpoints[i],
        src: image,
      };
    });
    return <Picture className={className} images={images} dpr={3} />;
  }
}
