// @flow
import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";

type Props = {
  data: Object,
  className?: string,
  breakpoints?: Array<string>,
};

export default class CuratedCardBackground extends PureComponent<Props> {
  render() {
    const {
      className,
      data,
      breakpoints = [
        "(max-width: 479px)",
        "(max-width: 767px)",
        "(min-width: 768px)",
      ],
    } = this.props;

    const images = [data.small_image, data.medium_image, data.large_image].map(
      (image, i) => {
        return {
          mediaQuery: breakpoints[i],
          src: image,
        };
      }
    );
    return <Picture className={className} images={images} dpr={3} />;
  }
}
