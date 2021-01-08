// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
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
import { getSelectedQuickDepositMethod } from "Models/payments/payments.selectors";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { isDesktop, Mobile } from "Components/ResponsiveLayout";
import { GameLauncher } from "Components/GameLauncher";
import { GamePageHeader } from "Components/GamePageHeader";
import { isNativeByUserAgent } from "GameProviders";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { QuickDepositSlipController } from "Components/QuickDepositSlip";
import { ReelRacesDrawerWidgetTrigger } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetTrigger";
import {
  useDataForBlueRibbonJackpotsWidget,
  BlueRibbonJackpotsFooterWidgetContainer,
} from "Components/PromotionalGameLists/BlueRibbonChristmas";
import {
  GamePageNotifications,
  FullScreenGamePageNotifications,
} from "./GamePageNotifications";
import { GamePageSidebar } from "./GamePageSidebar";
import { GamePage } from "./GamePage";
import { GamePageError } from "./GamePageError";
import { useGameModelContext, GamePageContextProvider } from "./Contexts";
import "./GamePage.scss";

type Props = {
  slug: string,
  playForFun: boolean,
  remoteGameLaunchData: ?Object,
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
  const bonusAmount = useSelector(playerWalletBonusSelector);
  const { isDGOJ } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const gameContent = useTranslations(`games.${slug}`);
  const { loading, gameCategory } = useGameCategory(slug);
  const { jackpots, available } = useDataForBlueRibbonJackpotsWidget();
  const isBlueRibbonFooterShown = available && jackpots.length > 0;
  const isNative = isNativeByUserAgent();
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategory);
  const quickDepositInProgress = Boolean(
    useSelector(getSelectedQuickDepositMethod)
  );

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

  const infoBar = () => shouldShowSlotControlSystem && <InfoBar />;

  const safeArea = () =>
    !isBlueRibbonFooterShown &&
    !isNative && (
      <div className="c-game-page__safe-area u-safe-area-inset-padding-bottom" />
    );

  return (
    <GamePage
      error={
        error ? (
          <GamePageError
            errorMessage={errorMessages?.general_error_title || ""}
            onRetry={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
          />
        ) : null
      }
      footer={
        <React.Fragment>
          {infoBar()}
          <Mobile>
            <BlueRibbonJackpotsFooterWidgetContainer />
            {safeArea()}
          </Mobile>
        </React.Fragment>
      }
      gameBackground={gameContent?.play_background}
      gameProviderModel={gameProviderModel}
      gameWindow={
        gameProviderModel && (
          <div
            className={classNames(
              "u-inset-0 u-position-absolute",
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
        </React.Fragment>
      }
      overScreenNotifications={
        <React.Fragment>
          <GamePageNotifications />
          <FullScreenGamePageNotifications />
        </React.Fragment>
      }
      shouldShowSlotControlSystem={shouldShowSlotControlSystem}
      quickDepositInProgress={quickDepositInProgress}
      sidebar={<GamePageSidebar />}
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
