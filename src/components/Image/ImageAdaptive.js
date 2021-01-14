// @flow
import React from "react";
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

// loading `<Picture>` on top when ready instead,
// not replacing when `isIntersecting` untill we find a better fix
// another solution could be delaying the replacement
const ImageAdaptive = React.forwardRef<Props, HTMLElement>(
  ({ className = "", images, isIntersecting, alt }: Props, ref) => (
    <React.Fragment>
      <ResponsiveImage
        containerRef={ref}
        className={className}
        src={head(images).src}
        imgixOpts={LOW_RES_IMAGE_SETTINGS}
        dpr={1}
        alt={alt}
      />
      {isIntersecting && (
        <Picture
          containerRef={ref}
          className={className}
          images={images}
          dpr={DEVICE_PIXEL_RATIO}
          alt={alt}
        />
      )}
    </React.Fragment>
  )
);

export default ImageAdaptive;
