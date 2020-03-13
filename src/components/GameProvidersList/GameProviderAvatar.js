// @flow
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

import "./GameProviderAvatar.scss";

type imgixOptsObject = {
  w: number,
  h: number,
};

type Props = {
  url: string,
  logo?: string,
  background?: string,
  imgixOpts?: imgixOptsObject,
};

const GameProviderAvatar = ({
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
    <a href={url} className="o-ratio">
      <ImageLazy
        className="o-ratio__content t-border-r--circle"
        mark={logo}
        src={background}
        imgixOpts={imgixOpts}
        {...rest}
      />
    </a>
  );
};

export default GameProviderAvatar;
