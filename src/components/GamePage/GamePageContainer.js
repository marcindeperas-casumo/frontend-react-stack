// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import Flex from "@casumo/cmp-flex";
import LoaderGlobal from "@casumo/cmp-loader-global";
import {
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
  useGameCategory,
  useDispatchPlaying,
  useInGameBonusOrRealBalanceCheck,
} from "Utils/hooks";
import { playerWalletBonusSelector } from "Models/player";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { isDesktop } from "Components/ResponsiveLayout/index";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";
import { DRAWERS } from "../Sidebar/SidebarElementWrapper/constants";
import { GamePage } from "./GamePage";
import { useGameModelContext, usePinnedWidgetsContext } from "./Contexts";
import "./GamePage.scss";

export const GamePageContainer = () => {
  const {
    slug,
    gameProviderModel,
    pauseGame,
    resumeGame,
    playForFun,
    error,
  } = useGameModelContext();
  const { pinnedWidgets } = usePinnedWidgetsContext();
  const bonusAmount = useSelector(playerWalletBonusSelector);
  const { isDGOJ } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const gameContent = useTranslations(`games.${slug}`);
  const { loading, gameCategory } = useGameCategory(slug);
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategory);

  useRealityCheckModal({ pauseGame, resumeGame });

  useInGameBonusOrRealBalanceCheck({ bonusAmount });

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
      <Flex className="t-background-grey-0 u-height--full">
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
      gameBackground={gameContent?.play_background}
      sidebar={
        pinnedWidgets.includes(DRAWERS.REEL_RACES) &&
        isDesktop() && (
          <ReelRacesDrawerWidget
            initialShowLeaderboard
            className="u-height--full"
          />
        )
      }
    />
  );
};
