import React from "react";
import Flex from "@casumo/cmp-flex";
import ImageLazy from "Components/Image/ImageLazy";

const Tile = ({
  url,
  logo,
  background,
  imgixOpts = { w: 160, h: 160 },
  ...rest
}) => (
  <Flex.Item className="o-flex__item-fixed-size c-tile">
    <a href={url}>
      <ImageLazy mark={logo} src={background} imgixOpts={imgixOpts} {...rest} />
    </a>
  </Flex.Item>
);

export default Tile;
