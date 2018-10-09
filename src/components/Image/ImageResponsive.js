import React from "react";
import ResponsiveImage from "@casumo/cmp-responsive-image";

export default class ImageResponsive extends React.Component {
  render() {
    const { isIntersecting, ...rest } = this.props;

    return isIntersecting ? (
      <ResponsiveImage imgixOpts={{ w: 170 }} {...rest} />
    ) : (
      <ResponsiveImage
        {
          // rest props should not override lowres props
          ...rest
        }
        mark={null}
        dpr={1}
        imgixOpts={{
          w: 5,
          blur: 2000,
        }}
      />
    );
  }
}
