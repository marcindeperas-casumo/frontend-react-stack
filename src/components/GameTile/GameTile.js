// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import GameTileOverlay from "Components/GameTile/GameTileOverlay";
import GameTileImage from "Components/GameTile/GameTileImage";
import type { Game } from "Types/game";

import "./GameTile.scss";

export type Props = {
  className?: string,
  game: Game,
  imgixOpts?: Object,
  onLaunchGame: Function,
  ratio?: string,
  isOverlayAlwaysActive?: boolean,
};

type State = {
  isOverlayActive: boolean,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

export default class GameTile extends PureComponent<Props, State> {
  handleOnClick: Function;
  handleOutsideClick: Function;

  constructor(props: Props) {
    super(props);
    this.state = {
      isOverlayActive: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  // handleOnClick and handleOutsideClick mimic a focus / blur type interaction

  handleOnClick() {
    this.setState({
      isOverlayActive: !this.state.isOverlayActive,
    });
    document.addEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick() {
    this.setState({
      isOverlayActive: false,
    });
    document.removeEventListener("click", this.handleOutsideClick);
  }

  render() {
    const {
      className,
      game = {},
      onLaunchGame,
      imgixOpts = {
        w: 170,
      },
      ratio = "game-tile",
      isOverlayAlwaysActive = false,
    } = this.props;
    const { inMaintenanceMode, logoBackground, logo, name, slug } = game;
    const { isOverlayActive } = this.state;
    const showOverlay = isOverlayAlwaysActive || isOverlayActive;

    return (
      <div
        className={classNames(
          inMaintenanceMode && IN_MAINTENANCE_CLASS_NAME,
          `o-ratio--${ratio}`,
          "c-game-tile o-ratio t-color-white t-border-r--md u-overflow-hidden",
          className
        )}
        onClick={this.handleOnClick}
      >
        <GameTileImage
          logoBackground={logoBackground}
          logo={logo}
          name={name}
          imgixOpts={imgixOpts}
        />
        {showOverlay && (
          <GameTileOverlay
            name={name}
            slug={slug}
            inMaintenanceMode={inMaintenanceMode}
            onLaunchGame={onLaunchGame}
            alwaysActive={isOverlayAlwaysActive}
          />
        )}
      </div>
    );
  }
}
