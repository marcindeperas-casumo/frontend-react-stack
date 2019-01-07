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
  clicked: boolean,
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
      clicked: false,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOnClick() {
    this.setState({
      clicked: !this.state.clicked,
    });
    document.addEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick(ev: Object) {
    if (this.wrapperRef && !this.wrapperRef.contains(ev.target)) {
      this.setState({
        clicked: false,
      });
    }
    document.removeEventListener("click", this.handleOutsideClick);
  }

  setWrapperRef(node: Node) {
    this.wrapperRef = node;
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
    const { clicked } = this.state;
    const showJackpot = !isEmpty(jackpotInfo) && !clicked;

    return (
      <div
        className={classNames(
          inMaintenanceMode && IN_MAINTENANCE_CLASS_NAME,
          `o-ratio--${ratio}`,
          "c-game-tile o-ratio t-border-r--8 t-color-white",
          className
        )}
        onClick={this.handleOnClick}
        ref={this.setWrapperRef}
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
            clicked ? "u-display--flex" : "u-display--none"
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
