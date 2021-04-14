import LoaderGlobal from "@casumo/cmp-loader-global";
import * as React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useCurrentReelRaceLeaderboard } from "Utils/hooks/useCurrentReelRaceLeaderboard";
import {
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
  useGameCategory,
  useDispatchPlaying,
  useInGameBonusOrRealBalanceCheck,
  useCurrentReelRaceInfo,
} from "Utils/hooks";
import { playerWalletBonusSelector } from "Models/player";
import { getSelectedQuickDepositMethod } from "Models/payments/payments.selectors";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { isDesktop, Mobile } from "Components/ResponsiveLayout";
import { GameLauncher } from "Components/GameLauncher";
import { GamePageHeader } from "Components/GamePageHeader";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { QuickDepositSlipController } from "Components/Payments/QuickDepositSlip";
import { ReelRacesDrawerWidgetTrigger } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetTrigger";
import { FiveMinuteBreakIconTrigger } from "Components/Compliance/GGL/FiveMinuteBreakIconTrigger";
import { BlueRibbonJackpotsFooterWidgetContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas";
import { InGameAdventureTrigger } from "Components/InGameAdventureTrigger";
import { DRAWERS } from "../Sidebar/SidebarElementWrapper/constants";
import {
  GamePageNotifications,
  FullScreenGamePageNotifications,
  BottomNotifications,
} from "./GamePageNotifications";
import { GamePageSidebar } from "./GamePageSidebar";
import { GamePage } from "./GamePage";
import { GamePageError } from "./GamePageError";
import {
  useGameModelContext,
  usePinnedWidgetsContext,
  GamePageContextProvider,
} from "./Contexts";
import { useFitToParentSize } from "./Hooks/useFitToParentSize";
import "./GamePage.scss";

type Props = {
  slug: string;
  playForFun: boolean;
  remoteGameLaunchData: Object | undefined;
};

export const GamePageContainer = () => {
  const {
    slug,
    gameProviderModel,
    pauseGame,
    resumeGame,
    playForFun,
    error,
  } = useGameModelContext();
  useCurrentReelRaceLeaderboard(slug);
  const bonusAmount = useSelector(playerWalletBonusSelector);
  const { isDGOJ, isGGL } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const gameContent = useTranslations(`games.${slug}`);
  const { loading, gameCategory } = useGameCategory(slug);
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategory);
  const quickDepositInProgress = Boolean(
    useSelector(getSelectedQuickDepositMethod)
  );

  const { pinnedWidgets } = usePinnedWidgetsContext();
  const currentRace = useCurrentReelRaceInfo();

  const showRRSidebar =
    currentRace?.optedIn &&
    currentRace?.game?.slug === slug &&
    pinnedWidgets.includes(DRAWERS.REEL_RACES);

  useRealityCheckModal({ pauseGame, resumeGame });

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'number'.
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

  useFitToParentSize();

  return (
    // @ts-expect-error ts-migrate(2786) FIXME: 'GamePage' cannot be used as a JSX component.
    <GamePage
      error={
        error ? (
          <GamePageError
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'general_error_title' does not exist on t... Remove this comment to see the full error message
            errorMessage={errorMessages?.general_error_title || ""}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'general_error_message_short' does not exist on t... Remove this comment to see the full error message
            retryMessage={errorMessages?.general_error_message_short}
            onRetry={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
          />
        ) : null
      }
      footer={
        <React.Fragment>
          {shouldShowSlotControlSystem && <InfoBar />}
          <Mobile>
            <BlueRibbonJackpotsFooterWidgetContainer />
            <div className="t-background-grey-90 u-safe-area-inset-padding-bottom" />
          </Mobile>
        </React.Fragment>
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'play_background' does not exist on type ... Remove this comment to see the full error message
      gameBackground={gameContent?.play_background}
      gameProviderModel={gameProviderModel}
      gameWindow={
        gameProviderModel && (
          <div
            className={classNames(
              "o-inset-x--none o-inset-y--none o-position--absolute",
              gameProviderModel.gameWrapperClasses || []
            )}
          >
            <GameLauncher
              gameProviderModel={gameProviderModel}
              className="c-game-page__game-launcher"
            />
          </div>
        )
      }
      header={<GamePageHeader />}
      loading={(!gameProviderModel || loading) && <LoaderGlobal />}
      offscreenElements={
        <React.Fragment>
          <QuickDepositSlipController
            position={isDesktop() ? "top" : "bottom"}
          />
          <ReelRacesDrawerWidgetTrigger />
          {isGGL && (
            <FiveMinuteBreakIconTrigger
              pauseGame={pauseGame}
              resumeGame={resumeGame}
              gameSlug={slug}
            />
          )}
          <InGameAdventureTrigger />
        </React.Fragment>
      }
      overScreenNotifications={
        <React.Fragment>
          <GamePageNotifications />
          <FullScreenGamePageNotifications />
          <BottomNotifications />
        </React.Fragment>
      }
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ error: Element; footer: Element; gameBackg... Remove this comment to see the full error message
      shouldShowSlotControlSystem={shouldShowSlotControlSystem}
      quickDepositInProgress={quickDepositInProgress}
      sidebar={showRRSidebar ? <GamePageSidebar /> : null}
    />
  );
};

export const GamePageWithContext = ({
  slug,
  playForFun,
  remoteGameLaunchData,
}: Props) => {
  return (
    <GamePageContextProvider
      slug={slug}
      playForFun={playForFun}
      remoteGameLaunchData={remoteGameLaunchData}
    >
      <GamePageContainer />
    </GamePageContextProvider>
  );
};
