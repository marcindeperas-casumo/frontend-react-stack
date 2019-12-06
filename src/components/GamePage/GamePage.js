// @flow

import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "@casumo/fe-toolkit-ismobile";
import Flex from "@casumo/cmp-flex";
import { isTestEnv } from "Models/handshake";
import { ENVIRONMENTS, DEVICES } from "Src/constants";
import { useLanguage, useGameLaunchData, useTranslations } from "Utils/hooks";
import { redirectToTranslatedUrl, ROUTE_IDS } from "Components/Router";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";

type Props = {
  slug: string,
  playForFun: boolean,
};

type ErrorTranslations = {
  general_error_title: string,
};

const ERRORS_PAGE_SLUG = "mobile.errors";

export const GamePage = ({ slug, playForFun }: Props) => {
  const environment = useSelector(isTestEnv)
    ? ENVIRONMENTS.TEST
    : ENVIRONMENTS.PRODUCTION;
  const platform = isMobile(window) ? DEVICES.MOBILE : DEVICES.DESKTOP;
  const language = useLanguage();
  const t: ?ErrorTranslations = useTranslations(ERRORS_PAGE_SLUG);

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
          errorMessage={t ? t.general_error_title : ""}
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
