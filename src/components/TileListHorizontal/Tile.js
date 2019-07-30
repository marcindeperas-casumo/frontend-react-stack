// @flow
import React from "react";
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
  imgixOpts = { w: 160, h: 160, markalign: "middle" },
  ...rest
}: Props) => {
  if (!background || !logo) {
    return null;
  }

  return (
    <a href={url} className="o-ratio t-border-r--circle u-overflow-hidden">
      <ImageLazy
        className="o-ratio__content"
        mark={logo}
        src={background}
        imgixOpts={imgixOpts}
        dpr={3}
        {...rest}
      />
    </a>
  );
};

export default Tile;
