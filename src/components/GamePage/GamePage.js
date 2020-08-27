// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { VerticalStretcher } from "Components/VerticalStretcher";
import type { GameProviderModel } from "GameProviders";
import { PlayOkayBar } from "Components/Compliance/PlayOkayBar";
import { useInGameBonusOrRealBalanceCheck } from "Utils/hooks";

type Props = {
  gameProviderModel: GameProviderModel,
  shouldShowSlotControlSystem: boolean,
  bonusAmount?: number,
};

export const GamePage = ({
  gameProviderModel,
  shouldShowSlotControlSystem,
  bonusAmount = 0,
}: Props) => {
  useInGameBonusOrRealBalanceCheck({ bonusAmount: bonusAmount });

  return (
    <VerticalStretcher gameProviderModel={gameProviderModel}>
      <Flex
        className="u-width--full u-height--full t-background-grey-90 t-color-white"
        direction="vertical"
        spacing="none"
      >
        <Flex.Item>
          <PlayOkayBar />
        </Flex.Item>
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
        </Flex.Block>
        {shouldShowSlotControlSystem && (
          <Flex.Item>
            <InfoBar />
          </Flex.Item>
        )}
      </Flex>
    </VerticalStretcher>
  );
};
