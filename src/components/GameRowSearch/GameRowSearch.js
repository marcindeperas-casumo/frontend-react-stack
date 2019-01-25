// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon, PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import type { Game } from "Types/game";
import GameThumb from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import TrackClick from "Components/TrackClick";

type Props = {
  /** The Game object containing name, logo, logoBackhround and slug of the game to be rendered */
  game: Game,
  /** The function in charge of launching the game */
  onLaunchGame: () => void,
};

export default class GameRowSearch extends PureComponent<Props> {
  render() {
    const { game = {}, onLaunchGame } = this.props;
    const { name, logo, logoBackground, slug } = game;
    const iconStyle =
      "t-background-white t-color-grey-light-1 t-border-r--circle u-padding--md";

    const RenderPlayIcon = () => (
      <TrackClick
        eventName={EVENTS.GAME_LAUNCH}
        data={{ [EVENT_PROPS.GAME_NAME]: name }}
      >
        <Flex.Item onClick={onLaunchGame}>
          {/* Play Icon */}
          <PlayIcon size="med" className={iconStyle} />
        </Flex.Item>
      </TrackClick>
    );

    const RenderMoreIcon = () => (
      <Flex.Item>
        <TrackClick
          eventName={EVENTS.GAME_DETAILS}
          data={{ [EVENT_PROPS.GAME_NAME]: name }}
        >
          {/* More Icon */}
          <a href={`/en/play/${slug}`}>
            <MoreIcon size="med" className={iconStyle} />
          </a>
        </TrackClick>
      </Flex.Item>
    );

    return (
      <Flex align="center" className="u-padding-vert">
        <Flex.Block onClick={onLaunchGame}>
          <TrackClick
            eventName={EVENTS.GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: name }}
          >
            <Flex align="center">
              {/* Image */}
              <Flex.Item className="o-flex__item-fixed-size">
                <GameThumb
                  src={logoBackground}
                  alt={name}
                  mark={logo}
                  width="64"
                  height="64"
                />
              </Flex.Item>

              {/* Text */}
              <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
                <Text tag="div" size="sm">
                  <DangerousHtml html={name} />
                </Text>
              </Flex.Block>
            </Flex>
          </TrackClick>
        </Flex.Block>
        {game.lobby ? <RenderPlayIcon /> : <RenderMoreIcon />}
      </Flex>
    );
  }
}
