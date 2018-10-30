// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";
import type { Props } from "Components/GameTile/GameTile";

export class GameTileWrapper extends PureComponent<Props> {
  render() {
    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        <GameTile {...this.props} />
      </Flex.Item>
    );
  }
}

export default GameTileWrapper;
