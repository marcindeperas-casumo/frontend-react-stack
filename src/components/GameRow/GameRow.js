// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { GameThumb } from "Components/GameThumb";
import { GameRowTrackMoreIcon } from "Components/GameRow/GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "Components/GameRow/GameRowTrackPlayIcon";
import TrackClick from "Components/TrackClick";

type Props = {
  /** The Game object */
  game: A.GameRow_Game,
  /** The function in charge of launching the game */
  onLaunchGame: () => void,
  /** Class name to apply to the game row */
  className?: string,
  /** a function that renders some text */
  renderText: () => React.Node,
};

export const GameRow = ({
  game = {},
  onLaunchGame,
  renderText,
  className = "",
}: Props) => {
  const { name, logo, backgroundImage, slug } = game;

  return (
    <Flex align="center" className={className}>
      <Flex.Block onClick={onLaunchGame}>
        <TrackClick
          eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
          data={{ [EVENT_PROPS.GAME_NAME]: name }}
        >
          <Flex align="center">
            <Flex.Item className="o-flex__item--no-shrink">
              <GameThumb src={backgroundImage} alt={name} mark={logo} />
            </Flex.Item>
            {renderText()}
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
};
