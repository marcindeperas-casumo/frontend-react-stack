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
  data: A.GameDetailsQuery,
  t: {
    gameInMaintenanceText: ?string,
    playButtonText: ?string,
    practiceButtonText: ?string,
  },
};

const TileImage = isDesktop() ? GameDetailsImageDesktop : GameDetailsImage;

export const GameDetails = ({ data, t }: Props) => {
  if (!data.game) {
    return null;
  }
  const game = data.game;

  return (
    <Flex
      direction={isDesktop() ? "horizontal" : "vertical"}
      className="c-game-details u-margin-x--auto u-padding-bottom--lg@tablet u-padding--lg@desktop t-border-r--md@tablet u-margin-x--md@tablet u-overflow-hidden"
    >
      <TileImage
        image={game.backgroundImage}
        mark={game.logo}
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
          "t-background-white u-overflow-hidden u-margin-x--md@desktop",
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
            {isDesktop() && <GameTileHeart gameId={game.id} />}
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
