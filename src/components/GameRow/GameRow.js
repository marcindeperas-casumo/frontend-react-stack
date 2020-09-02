// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { isMobile } from "Components/ResponsiveLayout";
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
  /** use bigger version, ie. on search page */
  big?: boolean,
};

export const GameRow = (props: Props) => {
  const { game, renderText, big = false } = props;
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
    } else if (isMobile()) {
      return <GameRowTrackMoreIcon name={game.name} slug={game.slug} />;
    }

    return null;
  })();

  return (
    <Flex
      align="center"
      className={classNames(
        "u-padding-x--md u-padding-x--lg@desktop u-padding-y u-width--full u-height--full",
        props.className
      )}
      onClick={onLaunchGame}
    >
      <Flex.Block>
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
                {...(big
                  ? {
                      width: 80,
                      height: 80,
                    }
                  : {})}
              />
            </Flex.Item>
            {renderText()}
          </Flex>
        </TrackClick>
      </Flex.Block>
      {rightSideComponent}
    </Flex>
  );
};
