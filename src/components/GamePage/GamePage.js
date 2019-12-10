// @flow

import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "@casumo/fe-toolkit-ismobile";
import Flex from "@casumo/cmp-flex";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
} from "Utils/hooks";
import { ROUTE_IDS, ENVIRONMENTS, DEVICES } from "Src/constants";
import { isTestEnv, languageSelector } from "Models/handshake";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";

type Props = {
  slug: string,
  playForFun: boolean,
  errorMessage: string,
  fetchTranslations: () => {},
};

export const GamePage = ({ slug, playForFun }: Props) => {
  const environment = useSelector(isTestEnv)
    ? ENVIRONMENTS.TEST
    : ENVIRONMENTS.PRODUCTION;
  const language = useSelector(languageSelector)
    ? ENVIRONMENTS.TEST
    : ENVIRONMENTS.PRODUCTION;
  const platform = isMobile(window) ? DEVICES.MOBILE : DEVICES.DESKTOP;
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
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
          errorMessage={errorMessages?.general_error_title || ""}
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
