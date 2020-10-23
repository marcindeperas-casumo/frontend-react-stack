// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";
import { FullscreenView } from "Components/FullscreenView";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { VerticalStretcher } from "Components/VerticalStretcher";
import type { GameProviderModel } from "GameProviders";
import { usePin } from "Utils/hooks/usePin";
import { useInGameBonusOrRealBalanceCheck } from "Utils/hooks";
import { QuickDepositSlipController } from "Components/QuickDepositSlip";
import { isDesktop } from "Components/ResponsiveLayout/index";
import { GamePageHeader } from "Components/GamePageHeader";
import { PinnedDrawersContext } from "Components/GamePage/Contexts/drawerPinningContext";
import { ReelRacesDrawerWidgetTrigger } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetTrigger";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { DRAWERS } from "../Sidebar/SidebarElementWrapper/constants";
import { GamePageNotifications } from "./GamePageNotifications";

type Props = {
  gameBackground?: string,
  gameProviderModel: GameProviderModel,
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
  shouldShowSlotControlSystem: boolean,
  bonusAmount?: number,
  sidebar?: React.Node,
};

export const GamePage = ({
  gameBackground = "",
  gameProviderModel,
  pauseGame,
  resumeGame,
  shouldShowSlotControlSystem,
  bonusAmount = 0,
  sidebar,
}: Props) => {
  useInGameBonusOrRealBalanceCheck({ bonusAmount });

  const pinState = usePin();
  const { pinnedDrawers } = pinState;

  return (
    <SumoIconContextProvider>
      <ReelRacesDrawerWidgetTrigger />
      <PinnedDrawersContext.Provider value={pinState}>
        <FullscreenView className="u-height--full u-width--screen t-background-grey-90">
          <VerticalStretcher gameProviderModel={gameProviderModel}>
            <Flex
              className="u-width--full u-height--full t-background-grey-90 t-color-white c-game-page"
              direction="vertical"
              spacing="none"
              style={{ backgroundImage: `url('${gameBackground || ""}')` }}
            >
              <Flex.Item>
                <GamePageHeader pauseGame={pauseGame} resumeGame={resumeGame} />
              </Flex.Item>
              <Flex
                direction="horizontal"
                spacing="none"
                className="u-padding-x--md@desktop u-padding-bottom--md@desktop c-game-page__central"
              >
                {pinnedDrawers.length > 0 && (
                  <Flex.Item className="u-padding-right c-game-page__sidebar u-overflow-y--auto">
                    {/* sidebar for pinned items */}
                    {sidebar}
                    {pinnedDrawers.includes(DRAWERS.REEL_RACES) &&
                      isDesktop() && (
                        <ReelRacesDrawerWidget initialShowLeaderboard />
                      )}
                  </Flex.Item>
                )}
                <Flex.Block className="u-position-relative o-flex c-game-page__flexible-game-container">
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
                  <GamePageNotifications />
                </Flex.Block>
              </Flex>
              {shouldShowSlotControlSystem && (
                <Flex.Item>
                  <InfoBar />
                </Flex.Item>
              )}
            </Flex>
            <QuickDepositSlipController />
          </VerticalStretcher>
        </FullscreenView>
      </PinnedDrawersContext.Provider>
    </SumoIconContextProvider>
  );
};
