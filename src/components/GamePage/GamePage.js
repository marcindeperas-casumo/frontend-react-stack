// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
} from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";

type Props = {
  slug: string,
  playForFun: boolean,
};

export const GamePage = ({ slug, playForFun }: Props) => {
  const { isDGOJ } = useJurisdiction();
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

  if (isDGOJ) {
    return (
      <div className="u-height--full u-width--full">
        <div className="u-width--full c-game-launcher-container--dgoj">
          <GameLauncher gameProviderModel={gameProviderModel} />
        </div>
        <InfoBar />
      </div>
    );
  }

  return <GameLauncher gameProviderModel={gameProviderModel} />;
};
