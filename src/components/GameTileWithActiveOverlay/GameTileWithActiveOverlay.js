// @flow
import React, { PureComponent } from "react";
import GameTile from "Components/GameTile/GameTile";
import type { Props } from "Components/GameTile/GameTile";

class GameTileWithActiveOverlay extends PureComponent<Props> {
  render() {
    return <GameTile {...this.props} isOverlayAlwaysActive />;
  }
}

export default GameTileWithActiveOverlay;
