import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";

export class GenericGameTile extends PureComponent {
  render() {
    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        <GameTile {...this.props} />
      </Flex.Item>
    );
  }
}

export default GenericGameTile;
