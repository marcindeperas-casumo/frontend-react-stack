// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { renderBets } from "Utils/utils";
import GameThumb from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import TrackClick from "Components/TrackClick";

type Props = {
  game: GameRowGame,
  onLaunchGame: () => void,
};

export default class GameRow extends PureComponent<Props> {
  render() {
    const { game = {}, onLaunchGame } = this.props;
    const { name, logo, logoBackground } = game;
    const jackpotInfo = game.jackpotInfo || {};
    const lobby = game.lobby || {};
    const { formattedJackpotAmount } = jackpotInfo;
    const { bets } = lobby;

    return (
      <TrackClick
        eventName={EVENTS.GAME_LAUNCH}
        data={{ [EVENT_PROPS.GAME_NAME]: name }}
      >
        <Flex
          align="center"
          data-test="game-row"
          className="u-padding-vert"
          onClick={onLaunchGame}
        >
          {/* Image */}
          <Flex.Item className="o-flex__item-fixed-size">
            <GameThumb
              src={logoBackground}
              alt={name}
              mark={logo}
              width={64}
              height={64}
            />
          </Flex.Item>

          {/* Text */}
          <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
            <JackpotAmount amount={formattedJackpotAmount} />
            <Text
              tag="div"
              size="sm"
              className={classNames({ "u-font-weight-bold": bets })}
            >
              <DangerousHtml html={name} />
            </Text>
            <BetsLevels bets={renderBets(bets)} />
          </Flex.Block>

          {/* Play Icon */}
          <Flex.Item>
            <PlayIcon
              size="med"
              className="t-background-white t-color-grey-light-1 t-border-r--circle u-padding--md"
            />
          </Flex.Item>
        </Flex>
      </TrackClick>
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

function BetsLevels({ bets }) {
  if (bets) {
    return (
      <Text tag="div" size="sm" className="u-padding-top--sm t-color-grey">
        {bets}
      </Text>
    );
  }

  return null;
}
