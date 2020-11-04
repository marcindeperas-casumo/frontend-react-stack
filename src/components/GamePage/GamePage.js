// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { FullscreenView } from "Components/FullscreenView";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { VerticalStretcher } from "Components/VerticalStretcher";
import type { GameProviderModel } from "GameProviders";
import { QuickDepositSlipController } from "Components/QuickDepositSlip";
import { GamePageHeader } from "Components/GamePageHeader";
import { ReelRacesDrawerWidgetTrigger } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetTrigger";
import { GamePageNotifications } from "./GamePageNotifications";

type Props = {
  gameBackground?: string,
  gameProviderModel: GameProviderModel,
  shouldShowSlotControlSystem: boolean,
  sidebar?: React.Node,
};

export const GamePage = ({
  gameBackground = "",
  gameProviderModel,
  shouldShowSlotControlSystem,
  sidebar,
}: Props) => {
  return (
    <FullscreenView className="u-height--full u-width--screen t-background-grey-90">
      <VerticalStretcher gameProviderModel={gameProviderModel}>
        <Flex
          className="u-width--full u-height--full t-background-grey-90 t-color-white c-game-page"
          direction="vertical"
          spacing="none"
          style={{ backgroundImage: `url('${gameBackground || ""}')` }}
        >
          <Flex.Item>
            <GamePageHeader />
          </Flex.Item>
          <Flex
            direction="horizontal"
            spacing="none"
            className="u-padding-x--md@desktop u-padding-bottom--md@desktop u-height--full"
          >
            <Flex.Item className="u-padding-right c-game-page__sidebar">
              {/* sidebar for pinned items */}
              {sidebar}
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
        <ReelRacesDrawerWidgetTrigger />
      </VerticalStretcher>
    </FullscreenView>
  );
};
