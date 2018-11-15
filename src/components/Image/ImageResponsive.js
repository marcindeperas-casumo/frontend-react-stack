import React from "react";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";
export default class ImageResponsive extends React.Component {
  render() {
    const { isIntersecting, src, ...rest } = this.props;
    // Make sure SVGs aren't loaded twice due to low res image settings query string.
    if (src.match(/\.svg$/)) {
      return isIntersecting ? (
        <ResponsiveImage src={src} {...rest} />
      ) : (
        <span />
      );
    }

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
