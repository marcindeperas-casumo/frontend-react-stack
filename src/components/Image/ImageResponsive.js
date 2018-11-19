import React from "react";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";
export default class ImageResponsive extends React.Component {
  render() {
    const { isIntersecting, src, ...rest } = this.props;

    return isIntersecting ? (
      <ResponsiveImage imgixOpts={{ w: 170 }} src={src} {...rest} />
    ) : (
      <ResponsiveImage
        src={src}
        {
          // rest props should not override lowres props
          ...rest
        }
        {...LOW_RES_IMAGE_SETTINGS}
      />
    );
  }
}
