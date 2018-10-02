// @flow
import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";

export type Images = {|
  small_image: string,
  medium_image: string,
  large_image: string,
|};

type Props = {|
  className?: string,
  images: Images,
  breakpoints?: Array<string>,
|};

export default class CuratedCardBackground extends PureComponent<Props> {
  render() {
    const {
      className,
      images,
      breakpoints = [
        "(max-width: 479px)",
        "(max-width: 767px)",
        "(min-width: 768px)",
      ],
    } = this.props;

    const imgSrcs = [
      images.small_image,
      images.medium_image,
      images.large_image,
    ].map((image, i) => ({
      mediaQuery: breakpoints[i],
      src: image,
    }));

    return <Picture className={className} images={imgSrcs} dpr={3} />;
  }
}
