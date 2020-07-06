// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import LoaderGlobal from "@casumo/cmp-loader-global";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
  useGameCategory,
  useDispatchPlaying,
} from "Utils/hooks";
import { getUrlSearchParam, decodedUrlParams } from "Utils";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GamePage } from "./GamePage";
import "./GamePage.scss";

type Props = {
  slug: string,
  playForFun: boolean,
  location: {
    search: string,
  },
};

export const GamePageContainer = ({ slug, playForFun, location }: Props) => {
  const launchData = getUrlSearchParam(location.search, "remoteGameLaunchData");

  const remoteGameLaunchData = launchData
    ? decodedUrlParams(JSON.parse(decodeURIComponent(launchData)))
    : null;

  const { isDGOJ } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const { loading, gameCategory } = useGameCategory(slug);
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategory);

  const { gameProviderModel, error, pauseGame, resumeGame } = useGameLaunchData(
    {
      playForFun,
      slug,
      remoteGameLaunchData,
    }
  );
  useRealityCheckModal({ pauseGame, resumeGame });

  useDispatchPlaying({
    isPlaying: true,
    gameId: slug,
  });

  useBeforePlayingModal({
    canLaunch: Boolean(
      !playForFun &&
        !error &&
        !loading &&
        gameProviderModel &&
        shouldShowSlotControlSystem
    ),
  });

  if (error) {
    return (
      <Flex className="t-background-chrome-light-2 u-height--full">
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
    <GamePage
      gameProviderModel={gameProviderModel}
      shouldShowSlotControlSystem={shouldShowSlotControlSystem}
    />
  );
};
