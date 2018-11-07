// @flow
import classNames from "classnames";
import React from "react";
import GameTileOverlay from "Components/GameTile/GameTileOverlay";
import GameTileImage from "Components/GameTile/GameTileImage";
import GameTileJackpot from "Components/GameTile/GameTileJackpot";

import "./GameTile.scss";

export type Props = {
  logoBackground: string,
  logo: string,
  name: string,
  slug: string,
  className: string,
  inMaintenanceMode: boolean,
  onLaunchGame: Function,
  jackpotInfo?: Object,
  ratio?: string,
  imgixOpts: Object,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

const GameTile = ({
  logoBackground,
  logo,
  name,
  slug,
  className,
  inMaintenanceMode,
  onLaunchGame,
  jackpotInfo,
  ratio = "game-tile",
  imgixOpts = {
    w: 170,
  },
}: Props) => (
  <div
    className={classNames(
      inMaintenanceMode && IN_MAINTENANCE_CLASS_NAME,
      `o-ratio--${ratio}`,
      "c-game-tile o-ratio t-border-r--8 t-color-white",
      className
    )}
    tabIndex={0}
  >
    <GameTileImage
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
      onLaunchGame={onLaunchGame}
    />
  </div>
);

export default GameTile;
