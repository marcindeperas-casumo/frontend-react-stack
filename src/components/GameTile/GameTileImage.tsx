import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  logoBackground: string;
  logo: string;
  name: string;
  imgixOpts?: Object;
};

const GameTileImage = ({ logoBackground, logo, name, ...rest }: Props) => {
  return (
    <ImageLazy
      className="o-ratio__content t-border-r"
      src={logoBackground}
      mark={logo}
      alt={name}
      {...rest}
    />
  );
};

export default GameTileImage;
