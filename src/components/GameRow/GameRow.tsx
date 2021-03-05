import Flex from "@casumo/cmp-flex";
import * as React from "react";
import classNames from "classnames";
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
  game: A.GameRow_GameFragment;
  /** Class name to apply to the game row */
  className?: string;
  /** a function that renders some text */
  renderText: () => React.ReactNode;
};

export const GameRow = (props: Props) => {
  const { game, renderText } = props;
  const onLaunchGame = () => {
    if (game.isInMaintenance) {
      return;
    }

    launchGame({ slug: game.slug });
  };

  const rightSideComponent = (() => {
    if (game.lobby) {
      return (
        <GameRowTrackPlayIcon name={game.name} onLaunchGame={onLaunchGame} />
      );
    }

    return <GameRowTrackMoreIcon name={game.name} slug={game.slug} />;
  })();

  return (
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
      data={{ [EVENT_PROPS.GAME_NAME]: game.name }}
      className="u-width--full"
    >
      <Flex
        className={classNames(
          "u-width--full u-height--full u-padding--md",
          props.className
        )}
        align="center"
        justify="space-around"
        onClick={onLaunchGame}
      >
        <Flex
          className={classNames("o-flex__item--no-shrink", {
            "t-greyscale c-game-row__game-thumb--maintenance":
              game.isInMaintenance,
          })}
        >
          <GameThumb
            src={game.backgroundImage}
            alt={game.name}
            mark={game.logo}
            width={GameRow.ICON_SIZE}
            height={GameRow.ICON_SIZE}
          />
        </Flex>
        <Flex className="u-padding-x--md o-flex--1 u-width">
          {renderText()}
        </Flex>
        {rightSideComponent && (
          <Flex className="o-flex__item--no-shrink">{rightSideComponent}</Flex>
        )}
      </Flex>
    </TrackClick>
  );
};

/* eslint-disable fp/no-mutation */
GameRow.ROW_HEIGHT = 96; // 64px icon with 16px padding around
GameRow.ICON_SIZE = 64;
/* eslint-enable fp/no-mutation */
