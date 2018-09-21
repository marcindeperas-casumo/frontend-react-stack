import classNames from "classnames";
import React from "react";
import GameTileOverlay from "Components/GameTile/GameTileOverlay";
import GameTileImage from "Components/GameTile/GameTileImage";
import GameTileJackpot from "Components/GameTile/GameTileJackpot";

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
