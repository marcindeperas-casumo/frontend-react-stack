// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";
import GameTileImage from "Components/GameTile/GameTileImage";
import { GameTileInMaintenance } from "Components/GameTile/GameTileInMaintenance";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
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

export const DEFAULT_CLASSES =
  "o-ratio t-color-white t-border-r--md t-background-chrome-light-1 u-overflow-hidden";

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
  // __FIX__: fix the typing around here
  const { isInMaintenance, backgroundImage, logo, name, slug } = game;

  if (isInMaintenance) {
    return (
      <GameTileInMaintenance
        ratio={ratio}
        className={className}
        game={game}
        imgixOpts={imgixOpts}
      />
    );
  }

  return (
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <Flex
        className={classNames(
          DEFAULT_CLASSES,
          "u-cursor-pointer",
          `o-ratio--${ratio}`,
          className
        )}
        onClick={onLaunchGame}
      >
        <GameTileImage
          logoBackground={backgroundImage}
          logo={logo}
          name={name}
          imgixOpts={imgixOpts}
        />
        <Flex
          justify="space-between"
          align="end"
          className="u-width--full o-ratio__content"
        >
          <Flex.Item onClick={e => e.stopPropagation()}>
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_DETAILS}
              data={{ [EVENT_PROPS.GAME_NAME]: name }}
            >
              <a
                className="u-padding u-display--block"
                href={`/en/play/${slug}`}
              >
                <MoreIcon className="t-color-white" />
              </a>
            </TrackClick>
          </Flex.Item>
          <Flex.Item onClick={e => e.stopPropagation()}>
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_FAVOURITE_CLICKED}
              data={{
                [EVENT_PROPS.GAME_NAME]: name,
                [EVENT_PROPS.IS_FAVOURITE]: !isInMyList,
              }}
            >
              <GameTileHeart
                className="u-padding u-width--2xlg"
                onClick={onFavouriteGame}
                isActive={isInMyList}
              />
            </TrackClick>
          </Flex.Item>
        </Flex>
      </Flex>
    </TrackClick>
  );
};
