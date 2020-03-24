// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import DangerousHtml from "Components/DangerousHtml";
import { GameDetailsImage } from "./GameDetailsImage";
import { GameDetailsButtons } from "./GameDetailsButtons";

import "./GameDetails.scss";

type Props = {
  data: A.GameDetailsQuery,
};

export const GameDetails = ({ data }: Props) => {
  if (data.game) {
    return (
      <div className="c-game-details u-margin-x--auto">
        <div className="u-margin-x--md@tablet u-margin-bottom--md t-background-white t-border-r--md@tablet u-overflow-hidden">
          <GameDetailsImage
            image={data.game.backgroundImage}
            mark={data.game.logo}
            alt={data.game.name}
          />
          <div className="u-padding--md">
            <Text size="md" className="u-font-weight-bold u-margin-bottom--md">
              {data.game.name}
            </Text>
            {data.game.description && (
              <Text tag="div" className="u-margin-bottom">
                <DangerousHtml html={data.game.description} />
              </Text>
            )}
            {data.game.media.map((media: A.GetGame_game_media) => (
              <img
                key={media.path}
                className="u-margin-y"
                src={media.path}
                alt={data.game?.name}
              />
            ))}
          </div>
          <GameDetailsButtons
            slug={data.game.slug}
            playButtonText={data.playButtonText}
            hasPlayForFun={data.game.hasPlayForFun}
            practiceButtonText={data.practiceButtonText}
          />
        </div>
      </div>
    );
  }
};
