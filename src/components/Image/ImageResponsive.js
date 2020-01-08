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

export default class ImageResponsive extends React.PureComponent<Props> {
  render() {
    const {
      isIntersecting,
      src = "",
      imgixOpts = { w: 170 },
      ...rest
    } = this.props;
    return (
      <ResponsiveImage
        imgixOpts={isIntersecting ? imgixOpts : { ...LOW_RES_IMAGE_SETTINGS }}
        dpr={isIntersecting ? DEVICE_PIXEL_RATIO : 1}
        src={src}
        {...rest}
      />
    );
  }
}
