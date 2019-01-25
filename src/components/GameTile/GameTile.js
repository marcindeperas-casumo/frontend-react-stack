/* eslint-disable fp/no-mutation */
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
  isOverlayEnabled?: boolean,
};

type State = {
  isOverlayActive: boolean,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

export default class GameTile extends PureComponent<Props, State> {
  setWrapperRef: Function;
  handleOnClick: Function;
  handleOutsideClick: Function;
  wrapperRef: Node;

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
      isOverlayEnabled = true,
    } = this.props;
    const {
      inMaintenanceMode,
      jackpotInfo = {},
      logoBackground,
      logo,
      name,
      slug,
    } = game;
    const { isOverlayActive } = this.state;
    const showJackpot = !isEmpty(jackpotInfo) && !isOverlayActive;
    const onGameTileClick = isOverlayEnabled
      ? this.handleOnClick
      : onLaunchGame;

    return (
      <div
        className={classNames(
          inMaintenanceMode && IN_MAINTENANCE_CLASS_NAME,
          `o-ratio--${ratio}`,
          "c-game-tile o-ratio t-border-r--8 t-color-white",
          className
        )}
        onClick={onGameTileClick}
      >
        <GameTileImage
          logoBackground={logoBackground}
          logo={logo}
          name={name}
          imgixOpts={imgixOpts}
        />
        {showJackpot && <GameTileJackpot jackpotInfo={jackpotInfo} />}
        {isOverlayEnabled && isOverlayActive && (
          <GameTileOverlay
            name={name}
            slug={slug}
            inMaintenanceMode={inMaintenanceMode}
            onLaunchGame={onLaunchGame}
          />
        )}
        {!isOverlayEnabled && (
          <div className="o-ratio__content c-game-tile__overlay--active" />
        )}
      </div>
    );
  }
}
