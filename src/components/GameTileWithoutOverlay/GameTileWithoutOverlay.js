// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "Components/GameTile/GameTile";
import type { Props } from "Components/GameTile/GameTile";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";

class GameTileWithoutOverlay extends PureComponent<Props> {
  render() {
    const { name } = this.props.game;

    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        <TrackClick
          eventName={EVENTS.GAME_LAUNCH}
          data={{ [EVENT_PROPS.GAME_NAME]: name }}
        >
          <GameTile {...this.props} isOverlayEnabled={false} />
        </TrackClick>
      </Flex.Item>
    );
  }
}

export default GameTileWithoutOverlay;
