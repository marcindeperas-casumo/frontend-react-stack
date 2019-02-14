// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import { MoreIcon, PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import type { Game } from "Types/game";
import GameThumb from "Components/GameThumb";
import GameRowSearchTitle from "Components/GameRowSearch/GameRowSearchTitle";
import TrackClick from "Components/TrackClick";
// The following style classes are coupled to GameRowSearch. If you're thinking of moving out TrackPlayIcon
// and TrackMoreIcon, style might not be applicable for their usage
const iconStyle =
  "t-background-white t-color-grey-light-1 t-border-r--circle u-padding--md";

type Props = {
  /** The Game object containing name, logo, logoBackhround and slug of the game to be rendered */
  game: Game,
  /** The function in charge of launching the game */
  onLaunchGame: () => void,
  /** The search query */
  query?: string,
};

const TrackPlayIcon = ({ name, onLaunchGame }) => (
  <TrackClick
    eventName={EVENTS.GAME_LAUNCH}
    data={{ [EVENT_PROPS.GAME_NAME]: name }}
  >
    <Flex.Item onClick={onLaunchGame}>
      <PlayIcon size="med" className={iconStyle} />
    </Flex.Item>
  </TrackClick>
);

const TrackMoreIcon = ({ name, slug }) => (
  <Flex.Item>
    <TrackClick
      eventName={EVENTS.GAME_DETAILS}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <a href={`/en/play/${slug}`}>
        <MoreIcon size="med" className={iconStyle} />
      </a>
    </TrackClick>
  </Flex.Item>
);

export default class GameRowSearch extends PureComponent<Props> {
  render() {
    const { game, onLaunchGame, query = "" } = this.props;
    const { name, logo, logoBackground, slug } = game;

    return (
      <Flex align="center" className="u-padding-vert">
        <Flex.Block onClick={onLaunchGame}>
          <TrackClick
            eventName={EVENTS.GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: name }}
          >
            <Flex align="center">
              <Flex.Item className="o-flex__item-fixed-size">
                <GameThumb
                  src={logoBackground}
                  alt={name}
                  mark={logo}
                  width={64}
                  height={64}
                />
              </Flex.Item>

              <Flex.Block className="u-padding-left--sm">
                <GameRowSearchTitle name={name} query={query} />
              </Flex.Block>
            </Flex>
          </TrackClick>
        </Flex.Block>
        {game.lobby ? (
          <TrackPlayIcon name={name} onLaunchGame={onLaunchGame} />
        ) : (
          <TrackMoreIcon name={name} slug={slug} />
        )}
      </Flex>
    );
  }
}
