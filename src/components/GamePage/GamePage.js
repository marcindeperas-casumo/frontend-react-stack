// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
} from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";

type Props = {
  slug: string,
  playForFun: boolean,
  errorMessage: string,
  fetchTranslations: () => {},
};

export const GamePage = ({ slug, playForFun }: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const { gameProviderModel, error } = useGameLaunchData({
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
