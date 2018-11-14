// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { isEmpty } from "ramda";
import GameTileOverlay from "Components/GameTile/GameTileOverlay";
import GameTileImage from "Components/GameTile/GameTileImage";
import GameTileJackpot from "Components/GameTile/GameTileJackpot";
import type { Game } from "Types/game";

import "./GameTile.scss";

export type Props = {
  className?: string,
  game: Game,
  imgixOpts?: Object,
  onLaunchGame: Function,
  ratio?: string,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

export default class GameTile extends PureComponent<Props> {
  render() {
    const {
      className,
      game = {},
      onLaunchGame,
      imgixOpts = {
        w: 170,
      },
      ratio = "game-tile",
    } = this.props;
    const {
      inMaintenanceMode,
      jackpotInfo = {},
      logoBackground,
      logo,
      name,
      slug,
    } = game;
    return (
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
        {!isEmpty(jackpotInfo) && <GameTileJackpot jackpotInfo={jackpotInfo} />}
        <GameTileOverlay
          name={name}
          slug={slug}
          inMaintenanceMode={inMaintenanceMode}
          onLaunchGame={onLaunchGame}
        />
      </div>
    );
  }
}
