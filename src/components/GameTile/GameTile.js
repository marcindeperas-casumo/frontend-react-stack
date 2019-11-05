// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";
import GameTileImage from "Components/GameTile/GameTileImage";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import TemporaryUnavailable from "Components/GameTile/TemporaryUnavailable";
import type { Game } from "Types/game";
import { EVENTS, EVENT_PROPS } from "Src/constants";

export type Props = {
  className?: string,
  game: Game,
  imgixOpts?: Object,
  onLaunchGame: Function,
  onFavouriteGame: Function,
  ratio?: string,
  isInMyList?: boolean,
};

export const IN_MAINTENANCE_CLASS_NAME = "t-greyscale";

export const GameTile = ({
  className,
  game = {},
  onLaunchGame,
  onFavouriteGame,
  imgixOpts = {
    w: 170,
    q: 70,
  },
  ratio = "game-tile",
  isInMyList = false,
}: Props) => {
  const { inMaintenanceMode, logoBackground, logo, name, slug } = game;

  return (
    <Flex
      className={classNames(
        "o-ratio t-color-white t-border-r--md t-background-chrome-light-1 u-overflow-hidden u-cursor-pointer",
        { "t-greyscale": inMaintenanceMode },
        `o-ratio--${ratio}`,
        className
      )}
      onClick={onLaunchGame}
    >
      <GameTileImage
        logoBackground={logoBackground}
        logo={logo}
        name={name}
        imgixOpts={imgixOpts}
      />

      {inMaintenanceMode ? (
        <TemporaryUnavailable />
      ) : (
        <Flex
          justify="space-between"
          align="end"
          className="u-width--full o-ratio__content"
        >
          <Flex.Item>
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_DETAILS}
              data={{ [EVENT_PROPS.GAME_NAME]: name }}
            >
              <a
                className="u-padding u-display--block"
                href={`/en/play/${slug}`}
                onClick={e => e.stopPropagation()}
              >
                <MoreIcon className="t-color-white" />
              </a>
            </TrackClick>
          </Flex.Item>
          <Flex.Item>
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_FAVOURITE_CLICKED}
              data={{
                [EVENT_PROPS.GAME_NAME]: name,
                [EVENT_PROPS.IS_FAVOURITE]: !isInMyList,
              }}
            >
              <GameTileHeart
                className="u-padding u-width--2xlg"
                onClick={e => {
                  e.stopPropagation();
                  onFavouriteGame();
                }}
                isActive={isInMyList}
              />
            </TrackClick>
          </Flex.Item>
        </Flex>
      )}
    </Flex>
  );
};
