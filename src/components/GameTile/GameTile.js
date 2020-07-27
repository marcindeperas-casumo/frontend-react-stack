// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";
import GameTileImage from "Components/GameTile/GameTileImage";
import { GameTileInMaintenanceContainer as GameTileInMaintenance } from "Components/GameTile";
import { launchGame } from "Services/LaunchGameService";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import * as A from "Types/apollo";
import { LiveCasinoCardMobileContainer } from "Components/LiveCasinoCard/LiveCasinoCardMobileContainer";

export type Props = {
  className?: string,
  game: A.GameTile_Game,
  imgixOpts?: Object,
  ratio?: string,
};

export const DEFAULT_CLASSES =
  "o-ratio t-color-white t-border-r--md t-background-grey-5 u-overflow-hidden";

export const GameTile = ({
  className,
  game = {},
  imgixOpts = {
    w: 170,
    q: 70,
  },
  ratio = "game-tile",
}: Props) => {
  const {
    isInMaintenance,
    backgroundImage,
    logo,
    name,
    slug,
    id,
    isInMyList,
    liveCasinoId,
  } = game;

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

  if (typeof liveCasinoId === "string") {
    // $FlowIgnore: game contains string liveCasinoId, checked above
    return <LiveCasinoCardMobileContainer game={game} />;
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
        onClick={() => launchGame({ slug: game.slug })}
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
              <a className="u-padding u-display--block" href={`/play/${slug}`}>
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
                gameId={id}
                gameSlug={slug}
                isInMyList={isInMyList}
              />
            </TrackClick>
          </Flex.Item>
        </Flex>
      </Flex>
    </TrackClick>
  );
};
