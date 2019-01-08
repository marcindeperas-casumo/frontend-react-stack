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
};

type State = {
  isActive: boolean,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

export default class GameTile extends PureComponent<Props, State> {
  // Commented flowtypes because of https://github.com/babel/babel/issues/8593
  /*::
  setWrapperRef: Function;
  handleOnClick: Function;
  handleOutsideClick: Function;
  wrapperRef: Node
  */

  constructor(props: Props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  // handleOnClick and handleOutsideClick mimic a focus / blur type interaction by
  // abusing how dom and react events work together. Listening on document receives events
  // after all React handlers fire causing handleOutsideClick to always trigger
  // on a second click after clicking a GameTile.

  handleOnClick() {
    this.setState({
      isActive: !this.state.isActive,
    });
    document.addEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick() {
    this.setState({
      isActive: false,
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
    } = this.props;
    const {
      inMaintenanceMode,
      jackpotInfo = {},
      logoBackground,
      logo,
      name,
      slug,
    } = game;
    const { isActive } = this.state;
    const showJackpot = !isEmpty(jackpotInfo) && !isActive;

    return (
      <div
        className={classNames(
          inMaintenanceMode && IN_MAINTENANCE_CLASS_NAME,
          `o-ratio--${ratio}`,
          "c-game-tile o-ratio t-border-r--8 t-color-white",
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
        {showJackpot && <GameTileJackpot jackpotInfo={jackpotInfo} />}
        <GameTileOverlay
          className={classNames(
            isActive ? "u-display--flex" : "u-display--none"
          )}
          name={name}
          slug={slug}
          inMaintenanceMode={inMaintenanceMode}
          onLaunchGame={onLaunchGame}
        />
      </div>
    );
  }
}
