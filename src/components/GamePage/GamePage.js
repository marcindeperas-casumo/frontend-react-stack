// @flow

import React, { useEffect } from "react";
import Flex from "@casumo/cmp-flex";
import type { AppEnvironment, AppDevice, AppLanguage } from "Src/types";
import { useGameLaunchData, useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";

type Props = {
  slug: string,
  playForFun: boolean,
  environment: AppEnvironment,
  platform: AppDevice,
  language: AppLanguage,
  errorMessage: string,
  fetchTranslations: () => {},
};

export const GamePage = ({
  slug,
  playForFun,
  environment,
  platform,
  language,
  errorMessage,
  fetchTranslations,
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { gameProviderModel, error } = useGameLaunchData({
    environment,
    language,
    platform,
    playForFun,
    slug,
  });

  useEffect(() => {
    fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Flex className="t-background-chrome-light-2 u-height--screen">
        <ErrorMessage
          errorMessage={errorMessage}
          retry={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
        />
      </Flex>
    );
  }

  if (!gameProviderModel) {
    return null;
  }

  return <GameLauncher gameProviderModel={gameProviderModel} />;
};
