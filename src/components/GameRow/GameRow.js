// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { renderBets } from "Utils";
import { GameThumb } from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import TrackClick from "Components/TrackClick";

type Props = {
  game: GameRow_Game,
  onLaunchGame: () => void,
};

export class GameRow extends PureComponent<Props> {
  render() {
    const { game = {}, onLaunchGame } = this.props;
    const { name, logo, logoBackground } = game;
    const lobby = game.lobby || {};
    const { bets } = lobby;

    return (
      <TrackClick
        eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
        data={{ [EVENT_PROPS.GAME_NAME]: name }}
      >
        <Flex
          align="center"
          data-test="game-row"
          className="u-padding-y"
          onClick={onLaunchGame}
        >
          {/* Image */}
          <Flex.Item className="o-flex__item--no-shrink">
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
            <PlayIcon className="t-background-white t-color-grey-light-1 t-border-r--circle u-padding--md" />
          </Flex.Item>
        </Flex>
      </TrackClick>
    );
  }
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
