// @flow
import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import type { Pictures } from "@casumo/cudl-react-prop-types";
import { head } from "ramda";
import { LOW_RES_IMAGE_SETTINGS, DEVICE_PIXEL_RATIO } from "../../constants";

type Props = {
  className: string,
  images: Pictures,
  isIntersecting: boolean,
  alt?: string,
};

export default class ImageAdaptive extends PureComponent<Props> {
  static defaultProps = {
    className: "",
  };

  render() {
    const { className, images, isIntersecting, alt } = this.props;

    // loading `<Picture>` on top when ready instead,
    // not replacing when `isIntersecting` untill we find a better fix
    // another solution could be delaying the replacement
    return (
      <>
        <ResponsiveImage
          className={className}
          src={head(images).src}
          imgixOpts={LOW_RES_IMAGE_SETTINGS}
          dpr={1}
          alt={alt}
        />
        {isIntersecting && (
          <Picture
            className={className}
            images={images}
            dpr={DEVICE_PIXEL_RATIO}
            alt={alt}
          />
        )}
      </>
    );
  }
}
