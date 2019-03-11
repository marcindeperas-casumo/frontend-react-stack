// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import ImageLazy from "Components/Image/ImageLazy";

import "./Tile.scss";

type imgixOptsObject = {
  w: number,
  h: number,
};

type Props = {
  url: string,
  logo?: string,
  background?: string,
  imgixOpts: imgixOptsObject,
};

const Tile = ({
  url,
  logo,
  background,
  imgixOpts = { w: 160, h: 160 },
  ...rest
}: Props) => {
  if (!background || !logo) {
    return null;
  }

  return (
    <Flex.Item className="o-flex__item-fixed-size c-tile">
      <a href={url} className="o-ratio t-border-r--circle">
        <ImageLazy
          className="o-ratio__content"
          mark={logo}
          src={background}
          imgixOpts={imgixOpts}
          dpr={3}
          {...rest}
        />
      </a>
    </Flex.Item>
  );
};

export default Tile;