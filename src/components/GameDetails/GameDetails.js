// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import DangerousHtml from "Components/DangerousHtml";
import { GameDetailsImage } from "./GameDetailsImage";
import { GameDetailsMedia } from "./GameDetailsMedia";
import { GameDetailsButtons } from "./GameDetailsButtons";

import "./GameDetails.scss";

type Props = {
  data: A.GameDetailsQuery,
};

export const GameDetails = ({ data }: Props) => {
  if (!data.game) {
    return null;
  }

  return (
    <div className="c-game-details u-margin-x--auto u-padding-bottom--lg@tablet u-padding-bottom--lg@desktop">
      <div className="t-background-white u-overflow-hidden u-margin-x--md@tablet t-border-r--md@tablet u-margin-x--md@desktop t-border-r--md@desktop">
        {data.game.isInMaintenance ? (
          <GameDetailsImage
            image={data.game.backgroundImage}
            mark={data.game.logo}
            alt={data.game.name}
            className="t-greyscale"
          >
            <Text className="t-color-white o-ratio__content o-flex o-flex-justify--center o-flex-align--end u-padding-bottom">
              {data.gameInMaintenanceText}
            </Text>
          </GameDetailsImage>
        ) : (
          <GameDetailsImage
            image={data.game.backgroundImage}
            mark={data.game.logo}
            alt={data.game.name}
          />
        )}
        <div className="u-padding--md">
          <Text
            size="md"
            data-testid="game-name-text"
            className="u-font-weight-bold u-margin-bottom--md"
          >
            {data.game.name}
          </Text>
          {data.game.description && (
            <Text
              tag="div"
              data-testid="game-description-text"
              className="u-margin-bottom--2xlg"
            >
              <DangerousHtml html={data.game.description} />
            </Text>
          )}
          <GameDetailsMedia media={data.game.media} name={data.game.name} />
        </div>
        {data.game && !data.game.isInMaintenance && (
          <GameDetailsButtons
            slug={data.game.slug}
            playButtonText={data.playButtonText}
            hasPlayForFun={data.game.hasPlayForFun}
            practiceButtonText={data.practiceButtonText}
          />
        )}
      </div>
    </div>
  );
};
