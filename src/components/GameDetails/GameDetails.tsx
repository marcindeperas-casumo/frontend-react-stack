// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { isDesktop } from "Components/ResponsiveLayout";
import DangerousHtml from "Components/DangerousHtml";
import { GameTileHeart } from "Components/GameTileHeart";
import { GameDetailsImage, GameDetailsImageDesktop } from "./GameDetailsImage";
import { GameDetailsMedia } from "./GameDetailsMedia";
import { GameDetailsButtons } from "./GameDetailsButtons";

import "./GameDetails.scss";

type Props = {
  game: A.GameDetailsQuery_game,
  t: {
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    gameInMaintenanceText: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    playButtonText: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    practiceButtonText: ?string,
  },
};

const TileImage = isDesktop() ? GameDetailsImageDesktop : GameDetailsImage;

export const GameDetails = ({ game, t }: Props) => {
  return (
    <Flex
      direction={isDesktop() ? "horizontal" : "vertical"}
      className="c-game-details u-margin-x--auto u-padding-bottom--lg@tablet u-padding--lg@desktop t-border-r--md@tablet u-margin-x--md@tablet u-overflow--hidden"
    >
      <TileImage
        image={game.backgroundImage}
        mark={game.logo}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; image: string; mark: st... Remove this comment to see the full error message
        alt={game.name}
        className={game.isInMaintenance ? "t-greyscale" : ""}
      >
        {game.isInMaintenance && (
          <Text className="t-color-white o-ratio__content o-flex o-flex-justify--center o-flex-align--end u-padding-bottom">
            {t.gameInMaintenanceText}
          </Text>
        )}
      </TileImage>
      <Flex
        direction="vertical"
        justify="space-between"
        className={[
          "t-background-white u-overflow--hidden u-margin-x--md@desktop",
          "t-border-r--md@desktop o-flex--1",
          "u-padding-x--xlg@desktop u-padding-y--2xlg@desktop",
        ].join(" ")}
      >
        <Flex direction="vertical" className="u-padding--md">
          <Flex justify="space-between" align="start">
            <Text
              size={isDesktop() ? "xlg" : "md"}
              data-testid="game-name-text"
              className="u-font-weight-bold u-margin-bottom--md u-margin-bottom--xlg@desktop"
            >
              {game.name}
            </Text>
            {isDesktop() && (
              <GameTileHeart gameId={game.id} gameName={game.name} />
            )}
          </Flex>
          {game.description && (
            <Text
              tag="div"
              data-testid="game-description-text"
              className="u-margin-bottom--2xlg"
            >
              <DangerousHtml html={game.description} />
            </Text>
          )}
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'GameDetailsMedia' cannot be used as a JSX compone... Remove this comment to see the full error message */}
          <GameDetailsMedia media={game.media} name={game.name} />
        </Flex>
        {game && !game.isInMaintenance && (
          <GameDetailsButtons
            slug={game.slug}
            name={game.name}
            playButtonText={t.playButtonText}
            hasPlayForFun={game.hasPlayForFun}
            practiceButtonText={t.practiceButtonText}
          />
        )}
      </Flex>
    </Flex>
  );
};
