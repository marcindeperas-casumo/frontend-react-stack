// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import GameThumb from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import type { Game } from "Types/game";

type Props = {
  game: Game,
  onLaunchGame: () => void,
};

export default class GameRow extends PureComponent<Props> {
  render() {
    const { game = {}, onLaunchGame } = this.props;
    const { jackpotInfo = {}, name, logo, logoBackground } = game;
    const { formattedJackpotAmount } = jackpotInfo;

    return (
      <Flex align="center" className="u-padding-vert" onClick={onLaunchGame}>
        {/* Image */}
        <Flex.Item>
          <GameThumb
            src={logoBackground}
            alt={name}
            mark={logo}
            width="70"
            height="70"
          />
        </Flex.Item>

        {/* Text */}
        <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
          <JackpotAmount amount={formattedJackpotAmount} />
          <Text tag="div" size="sm">
            <DangerousHtml html={name} />
          </Text>
        </Flex.Block>

        {/* Play Icon */}
        <Flex.Item>
          <PlayIcon
            size="med"
            className="t-background-white t-color-grey-light-1 t-border-r--circle u-padding--md"
          />
        </Flex.Item>
      </Flex>
    );
  }
}

function JackpotAmount({ amount }) {
  if (amount) {
    return (
      <Text
        tag="div"
        size="sm"
        className="u-font-weight-bold t-color-red u-padding-bottom--sm"
      >
        {amount}
      </Text>
    );
  }

  return null;
}