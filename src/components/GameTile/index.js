import classNames from "classnames";
import React from "react";
import GameTileOverlay from "./GameTileOverlay";
import GameTileImage from "./GameTileImage";
import GameTileJackpot from "./GameTileJackpot";

const GameTile = ({
  logoBackground,
  logo,
  name,
  slug,
  className,
  inMaintenanceMode,
  launchGame,
  jackpotInfo,
  ratio = "game-tile",
  imgixOpts = {
    w: 170,
  },
}) => (
  <div
    className={classNames(
      inMaintenanceMode && "t-greyscale",
      `o-ratio--${ratio}`,
      "c-game-tile o-ratio t-border-r--8 t-color-white",
      className
    )}
    tabIndex={0}
  >
    <GameTileImage
      inMaintenanceMode={inMaintenanceMode}
      logoBackground={logoBackground}
      logo={logo}
      name={name}
      imgixOpts={imgixOpts}
    />
    {jackpotInfo && <GameTileJackpot jackpotInfo={jackpotInfo} />}
    <GameTileOverlay
      name={name}
      slug={slug}
      inMaintenanceMode={inMaintenanceMode}
      launchGame={launchGame}
    />
  </div>
);

export default GameTile;
