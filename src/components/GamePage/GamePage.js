// @flow

import React, { useState } from "react";
import Flex from "@casumo/cmp-flex";
import LoaderGlobal from "@casumo/cmp-loader-global";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
  useGameCategories,
} from "Utils/hooks";
import { DGOJBar } from "Components/Compliance/DGOJBar";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import "./GamePage.scss";

type Props = {
  slug: string,
  playForFun: boolean,
};

export const GamePage = ({ slug, playForFun }: Props) => {
  const [isGameActive, setGameActive] = useState(false);
  const { isDGOJ } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const { loading, gameCategories } = useGameCategories(slug);
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategories);
  const { gameProviderModel, error, pauseGame, resumeGame } = useGameLaunchData(
    {
      playForFun,
      slug,
      callbacks: {
        onGameActive: () => {
          setGameActive(true);
        },
        onGameIdle: () => {
          setGameActive(false);
        },
      },
    }
  );
  useRealityCheckModal({ pauseGame, resumeGame });

  useBeforePlayingModal({
    canLaunch: Boolean(
      !playForFun &&
        !error &&
        !loading &&
        gameProviderModel &&
        shouldShowSlotControlSystem
    ),
  });

  if (error && !isGameActive) {
    return (
      <Flex className="t-background-chrome-light-2 u-height--screen">
        <ErrorMessage
          errorMessage={errorMessages?.general_error_title || ""}
          retry={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
        />
      </Flex>
    );
  }

  if (!gameProviderModel || loading) {
    return <LoaderGlobal />;
  }

  return (
    <Flex
      className="u-height--full t-background-chrome-dark-3 t-color-white"
      direction="vertical"
      spacing="none"
    >
      <Flex.Item>{isDGOJ && <DGOJBar />}</Flex.Item>
      <Flex.Block className="u-position-relative">
        <div className="c-game-page__game-wrapper">
          <GameLauncher
            gameProviderModel={gameProviderModel}
            className="c-game-page__game-launcher"
          />
        </div>
      </Flex.Block>
      <Flex.Item>{shouldShowSlotControlSystem && <InfoBar />}</Flex.Item>
    </Flex>
  );
};
