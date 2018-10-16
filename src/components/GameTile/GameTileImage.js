import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

const GameTileImage = ({
  inMaintenanceMode,
  logoBackground,
  logo,
  name,
  ...rest
}) => {
  return (
    <ImageLazy
      className="o-ratio__content t-border-r--8"
      src={logoBackground}
      mark={logo}
      alt={name}
      dpr={3}
      {...rest}
    />
  );
};

export default GameTileImage;
