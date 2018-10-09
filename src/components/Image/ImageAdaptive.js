// @flow
import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";

export type Images = {|
  small_image: string,
  medium_image: string,
  large_image: string,
|};

type Props = {|
  className?: string,
  images: Images,
  breakpoints?: Array<string>,
  isIntersecting: boolean,
|};

export default class ImageAdaptive extends PureComponent<Props> {
  render() {
    const {
      className,
      images,
      breakpoints = [
        "(max-width: 479px)",
        "(max-width: 767px)",
        "(min-width: 768px)",
      ],
      isIntersecting,
    } = this.props;

    const imgSrcs = [
      images.small_image,
      images.medium_image,
      images.large_image,
    ].map((image, i) => ({
      mediaQuery: breakpoints[i],
      src: image,
    }));

    return isIntersecting ? (
      <Picture className={className} images={imgSrcs} dpr={3} />
    ) : (
      <ResponsiveImage
        className={className}
        src={images.small_image}
        {...LOW_RES_IMAGE_SETTINGS}
      />
    );
  }
}
