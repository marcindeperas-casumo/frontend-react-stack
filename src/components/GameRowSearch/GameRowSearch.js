// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import { MoreIcon, PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import type { Game } from "Types/game";
import { GameThumb } from "Components/GameThumb";
import { GameRowSearchTitle } from "Components/GameRowSearch/GameRowSearchTitle";
import TrackClick from "Components/TrackClick";
// The following style classes are coupled to GameRowSearch. If you're thinking of moving out TrackPlayIcon
// and TrackMoreIcon, style might not be applicable for their usage
const iconStyle =
  "t-background-chrome-light-2 t-color-chrome-dark-3 t-border-r--circle u-padding";

type Props = {
  /** The Game object containing name, logo, logoBackhround and slug of the game to be rendered */
  game: Game,
  /** The function in charge of launching the game */
  onLaunchGame: () => void,
  /** The search query */
  query: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
};

const TrackPlayIcon = ({ name, onLaunchGame }) => (
  <TrackClick
    eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
    data={{ [EVENT_PROPS.GAME_NAME]: name }}
  >
    <Flex.Item className="o-flex__item--no-shrink" onClick={onLaunchGame}>
      <PlayIcon className={iconStyle} />
    </Flex.Item>
  </TrackClick>
);

const TrackMoreIcon = ({ name, slug }) => (
  <Flex.Item className="o-flex__item--no-shrink">
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_DETAILS}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <a href={`/en/play/${slug}`}>
        <MoreIcon className={iconStyle} />
      </a>
    </TrackClick>
  </Flex.Item>
);

export class GameRowSearch extends PureComponent<Props> {
  static defaultProps = {
    query: "",
    highlightSearchQuery: false,
  };

  render() {
    const { game, onLaunchGame, query, highlightSearchQuery } = this.props;
    const { name, logo, logoBackground, slug } = game;

    return (
      <Flex align="center">
        <Flex.Block onClick={onLaunchGame}>
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: name }}
          >
            <Flex align="center">
              <Flex.Item className="o-flex__item--no-shrink">
                <GameThumb src={logoBackground} alt={name} mark={logo} />
              </Flex.Item>

              <Flex.Block className="u-padding-left--sm t-color-grey-dark-2">
                <GameRowSearchTitle
                  highlightSearchQuery={highlightSearchQuery}
                  name={name}
                  query={query}
                />
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
