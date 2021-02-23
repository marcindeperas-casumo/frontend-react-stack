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
  logo,
  background,
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ w: number; h: number; markalign: string; }... Remove this comment to see the full error message
  imgixOpts = { w: 160, h: 160, markalign: "middle" },
  ...rest
}: Props) => {
  if (!background || !logo) {
    return null;
  }

  return (
    <ImageLazy
      className="o-ratio__content t-border-r--circle"
      mark={logo}
      src={background}
      imgixOpts={imgixOpts}
      {...rest}
    />
  );
};

export default GameProviderAvatar;
