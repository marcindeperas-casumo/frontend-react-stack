import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";

export class ExclusiveGameTile extends PureComponent {
  imgixOpts = {
    w: 188,
    h: 280,
    fit: "crop",
  };

  render() {
    const { onLaunchGame, ...rest } = this.props;
    return (
      <Flex.Item className="o-flex__item-fixed-size o-flex c-exclusive-game">
        <GameTile
          {...rest}
          ratio="game-tile-exclusive"
          imgixOpts={this.imgixOpts}
          launchGame={onLaunchGame}
        />
      </Flex.Item>
    );
  }
}

export default ExclusiveGameTile;
