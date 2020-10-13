// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { FullscreenView } from "Components/FullscreenView";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { VerticalStretcher } from "Components/VerticalStretcher";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { ReelRacesDrawerContainer as ReelRacesDrawer } from "Components/ReelRacesDrawer/ReelRacesDrawerContainer";
import type { GameProviderModel } from "GameProviders";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { PlayOkayBar } from "Components/Compliance/PlayOkayBar";
import { playingSelector } from "Models/playing";
import { isNativeByUserAgent } from "GameProviders";
import { useInGameBonusOrRealBalanceCheck } from "Utils/hooks";
import { isDesktop } from "Components/ResponsiveLayout/index";
import { DRAWERS } from "../Sidebar/SidebarElementWrapper/constants";
import {
  pinnedDrawersContext,
  usePin,
} from "../../utils/hooks/usePinningContext";
import { GamePageNotifications } from "./GamePageNotifications";

type Props = {
  gameProviderModel: GameProviderModel,
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
  shouldShowSlotControlSystem: boolean,
  bonusAmount?: number,
  sidebar?: React.Node,
};

export const GamePage = ({
  gameProviderModel,
  pauseGame,
  resumeGame,
  shouldShowSlotControlSystem,
  bonusAmount = 0,
  sidebar,
}: Props) => {
  useInGameBonusOrRealBalanceCheck({ bonusAmount });
  const playing = useSelector(playingSelector);
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentReelRace = isNativeByUserAgent()
    ? null
    : currentReelRaceFromHook;

  const commonRaceProps = {
    currentRace: currentReelRace,
  };
  const pinState = usePin();
  const { pinnedDrawers } = pinState;

  return (
    <pinnedDrawersContext.Provider value={pinState}>
      <FullscreenView className="u-height--full u-width--screen t-background-grey-90">
        <VerticalStretcher gameProviderModel={gameProviderModel}>
          <Flex
            className="u-width--full u-height--full t-background-grey-90 t-color-white"
            direction="vertical"
            spacing="none"
          >
            <Flex.Item>
              <PlayOkayBar pauseGame={pauseGame} resumeGame={resumeGame} />
            </Flex.Item>
            <Flex
              direction="horizontal"
              spacing="none"
              className="u-height--full"
            >
              {pinnedDrawers.length > 0 && (
                <Flex.Item>
                  {/* sidebar for pinned items */}
                  {sidebar}
                  {pinnedDrawers.includes(DRAWERS.REEL_RACES) && isDesktop() && (
                    <SidebarElementWrapper>
                      <ReelRacesDrawer {...commonRaceProps} />
                    </SidebarElementWrapper>
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
        </VerticalStretcher>
      </FullscreenView>
    </pinnedDrawersContext.Provider>
  );
};
