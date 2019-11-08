import React, { PureComponent } from "react";
import { GameTile } from "Components/GameTile/GameTile";

class GameTileExclusive extends PureComponent {
  imgixOpts = {
    w: 188,
    h: 280,
    fit: "crop",
  };

  render() {
    return (
      <GameTile
        {...this.props}
        ratio="game-tile-exclusive"
        imgixOpts={this.imgixOpts}
      />
    );
  }
}

export default GameTileExclusive;
