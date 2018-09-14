import React from "react";
import LazyImage from "../LazyImage";

const GameTileImage = ({
  inMaintenanceMode,
  logoBackground,
  logo,
  name,
  ...rest
}) => {
  return (
    <LazyImage
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
