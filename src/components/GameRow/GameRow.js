// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { GameThumb } from "Components/GameThumb";
import TrackClick from "Components/TrackClick";
import { GameRowTrackMoreIcon } from "./GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "./GameRowTrackPlayIcon";
import "./GameRow.scss";

type Props = {
  /** The Game object */
  game: A.GameRow_Game,
  /** Class name to apply to the game row */
  className?: string,
  /** a function that renders some text */
  renderText: () => React.Node,
};

export const GameRow = (props: Props) => {
  const { game, renderText } = props;
  const onLaunchGame = () => {
    if (game.isInMaintenance) {
      return;
    }

    launchGame({ slug: game.slug });
  };

  return (
    <Flex align="center" className={props.className || ""}>
      <Flex.Block onClick={onLaunchGame}>
        <TrackClick
          eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
          data={{ [EVENT_PROPS.GAME_NAME]: game.name }}
        >
          <Flex align="center">
            <Flex.Item
              className={classNames("o-flex__item--no-shrink", {
                "t-greyscale c-game-row__game-thumb--maintenance":
                  game.isInMaintenance,
              })}
            >
              <GameThumb
                src={game.backgroundImage}
                alt={game.name}
                mark={game.logo}
              />
            </Flex.Item>
            {renderText()}
          </Flex>
        </TrackClick>
      </Flex.Block>
      {game.lobby ? (
        <GameRowTrackPlayIcon name={game.name} onLaunchGame={onLaunchGame} />
      ) : (
        <GameRowTrackMoreIcon
          name={game.name}
          slug={game.slug}
          isInMaintenance={game.isInMaintenance}
        />
      )}
    </Flex>
  );
};
