// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { GameThumb } from "Components/GameThumb";
import { GameRowSearchText } from "Components/GameRow/GameRowSearchText";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GameRowTrackMoreIcon } from "Components/GameRow/GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "Components/GameRow/GameRowTrackPlayIcon";
import TrackClick from "Components/TrackClick";

export type SearchProps = {
  /** The search query */
  query?: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
};

type Props = {
  /** The Game object containing name, logo, logoBackground and slug of the game to be rendered */
  game: gGameRow_Game,
  /** The function in charge of launching the game */
  onLaunchGame: () => void,
  /** Class name to apply to the game row */
  className?: string,
  /** The search props */
  search?: SearchProps | boolean,
};

export class GameRow extends PureComponent<Props> {
  render() {
    const { game = {}, onLaunchGame, search, className = "" } = this.props;
    const { name, logo, logoBackground, slug } = game;
    const lobby = game.lobby || {};
    const { bets } = lobby;

    return (
      <Flex
        align="center"
        className={classNames({ "u-padding--md": !search }, className)}
      >
        <Flex.Block onClick={onLaunchGame}>
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: name }}
          >
            <Flex align="center">
              <Flex.Item className="o-flex__item--no-shrink">
                <GameThumb src={logoBackground} alt={name} mark={logo} />
              </Flex.Item>
              {search ? (
                <GameRowSearchText name={name} search={search} />
              ) : (
                <GameRowText name={name} bets={bets} />
              )}
            </Flex>
          </TrackClick>
        </Flex.Block>
        {game.lobby ? (
          <GameRowTrackPlayIcon name={name} onLaunchGame={onLaunchGame} />
        ) : (
          <GameRowTrackMoreIcon name={name} slug={slug} />
        )}
      </Flex>
    );
  }
}
