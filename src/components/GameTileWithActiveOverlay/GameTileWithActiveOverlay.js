// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";
import type { Props } from "Components/GameTile/GameTile";

class GameTileWithActiveOverlay extends PureComponent<Props> {
  render() {
    return (
      <Flex.Item className="o-flex__item--no-shrink c-top-game">
        <GameTile {...this.props} isOverlayAlwaysActive />
      </Flex.Item>
    );
  }
}

export default GameTileWithActiveOverlay;
