// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";
import type { Props } from "Components/GameTile/GameTile";

class GameTileWithActiveOverlay extends PureComponent<Props> {
  render() {
    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        <GameTile {...this.props} isOverlayAlwaysActive={true} />
      </Flex.Item>
    );
  }
}

export default GameTileWithActiveOverlay;
