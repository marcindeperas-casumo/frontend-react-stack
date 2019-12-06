// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import type { AppEnvironment, AppDevice, AppLanguage } from "Src/types";
import { useGameLaunchData } from "Utils/hooks";
import { redirectToTranslatedUrl, ROUTE_IDS } from "Components/Router";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";

type Props = {
  slug: string,
  playForFun: boolean,
  environment: AppEnvironment,
  platform: AppDevice,
  language: AppLanguage,
  errorMessage: string,
};

export const GamePage = ({
  slug,
  playForFun,
  environment,
  platform,
  language,
  errorMessage,
}: Props) => {
  const { gameProviderModel, error } = useGameLaunchData({
    environment,
    language,
    platform,
    playForFun,
    slug,
  });

  if (error) {
    return (
      <Flex className="t-background-chrome-light-2 u-height--screen">
        <ErrorMessage
          errorMessage={errorMessage}
          retry={() => redirectToTranslatedUrl(language, ROUTE_IDS.TOP_LISTS)}
        />
      </Flex>
    );
  }

  if (!gameProviderModel) {
    return null;
  }

  return <GameLauncher gameProviderModel={gameProviderModel} />;
};
