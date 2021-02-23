//@flow
import React from "react";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { LOW_RES_IMAGE_SETTINGS, DEVICE_PIXEL_RATIO } from "../../constants";

type Props = {
  isIntersecting: boolean,
  src?: string,
  imgixOpts?: Object,
  alt?: string,
};

const ImageResponsive = React.forwardRef<Props, HTMLImageElement>(
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ isIntersecting, src, imgixOpt... Remove this comment to see the full error message
  (
    { isIntersecting, src = "", imgixOpts = { w: 170 }, ...rest }: Props,
    ref
  ) => (
    <ResponsiveImage
      containerRef={ref}
      imgixOpts={isIntersecting ? imgixOpts : { ...LOW_RES_IMAGE_SETTINGS }}
      dpr={isIntersecting ? DEVICE_PIXEL_RATIO : 1}
      src={src}
      {...rest}
    />
  )
);

export default ImageResponsive;
