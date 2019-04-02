import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";

class GameTileExclusive extends PureComponent {
  imgixOpts = {
    w: 188,
    h: 280,
    fit: "crop",
  };

  render() {
    return (
      <Flex.Item className="o-flex__item--no-shrink c-exclusive-game">
        <GameTile
          {...this.props}
          ratio="game-tile-exclusive"
          imgixOpts={this.imgixOpts}
        />
      </Flex.Item>
    );
  }
}

export default GameTileExclusive;
