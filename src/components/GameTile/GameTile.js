// @flow
import React, { createRef, PureComponent } from "react";
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
  onFavouriteGame: Function,
  ratio?: string,
  isOverlayAlwaysActive?: boolean,
  isInMyList?: boolean,
};

type State = {
  isOverlayActive: boolean,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

export default class GameTile extends PureComponent<Props, State> {
  handleOnClick: Function;
  handleOutsideClick: Function;
  myRef: {|
    current: any,
  |};

  constructor(props: Props) {
    super(props);
    this.myRef = createRef();
    this.state = {
      isOverlayActive: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOnClick(ev: SyntheticEvent<HTMLElement>) {
    const hasClickedInOverlay = this.myRef.current
      .querySelector(".c-game-tile__overlay")
      .contains(ev.target);

    if (!hasClickedInOverlay) {
      this.setState({
        isOverlayActive: true,
      });
      document.addEventListener("click", this.handleOutsideClick);
    }
  }

  handleOutsideClick(ev: SyntheticEvent<HTMLElement>) {
    const hasClickedInOverlay = this.myRef.current
      .querySelector(".c-game-tile__overlay")
      .contains(ev.target);
    if (!hasClickedInOverlay) {
      this.setState({
        isOverlayActive: false,
      });
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  render() {
    const {
      className,
      game = {},
      onLaunchGame,
      onFavouriteGame,
      imgixOpts = {
        w: 170,
      },
      ratio = "game-tile",
      isOverlayAlwaysActive = false,
      isInMyList = false,
    } = this.props;
    const { inMaintenanceMode, logoBackground, logo, name, slug } = game;
    const { isOverlayActive } = this.state;
    const showOverlay = isOverlayAlwaysActive || isOverlayActive;

    return (
      <div
        ref={this.myRef}
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
        <div
          className={classNames(
            showOverlay ? "u-display--block" : "u-display--none"
          )}
        >
          <GameTileOverlay
            name={name}
            slug={slug}
            inMaintenanceMode={inMaintenanceMode}
            onLaunchGame={onLaunchGame}
            onFavouriteGame={onFavouriteGame}
            alwaysActive={isOverlayAlwaysActive}
            isInMyList={isInMyList}
          />
        </div>
        )}
      </div>
    );
  }
}
