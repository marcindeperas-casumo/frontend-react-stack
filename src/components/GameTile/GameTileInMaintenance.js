// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { DEFAULT_CLASSES } from "Components/GameTile/GameTile";
import GameTileImage from "Components/GameTile/GameTileImage";
import { CMSField } from "Components/CMSField";
import * as A from "Types/apollo";

export type Props = {
  ratio: string,
  game: A.GameTileInMaintenance_Game,
  className?: string,
  imgixOpts?: Object,
};

export const GameTileInMaintenance = ({
  ratio = "game-tile",
  className,
  game,
  imgixOpts,
}: Props) => {
  const { backgroundImage, logo, name } = game;

  return (
    <Flex
      className={classNames(
        DEFAULT_CLASSES,
        "t-greyscale",
        `o-ratio--${ratio}`,
        className
      )}
    >
      <GameTileImage
        logoBackground={backgroundImage}
        logo={logo}
        name={name}
        imgixOpts={imgixOpts}
      />
      <Flex
        justify="center"
        align="center"
        className="u-width--full o-ratio__content u-text-align-center"
      >
        <CMSField slug="mobile.game-details" field="temporarily_unavailable" />
      </Flex>
    </Flex>
  );
};
