import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { FullscreenView } from "Components/FullscreenView";
import { VerticalStretcher } from "Components/VerticalStretcher";
import type { GameProviderModel } from "GameProviders";

type Props = {
  error: React.ReactNode;
  footer: React.ReactNode;
  gameBackground?: string;
  gameProviderModel: GameProviderModel;
  gameWindow: React.ReactNode;
  header: React.ReactNode;
  loading: React.ReactNode;
  quickDepositInProgress: boolean;
  offscreenElements: React.ReactChild;
  overScreenNotifications: React.ReactNode;
  sidebar?: React.ReactNode;
};

export const GamePage = ({
  error,
  footer,
  gameBackground = "",
  gameProviderModel,
  gameWindow,
  header,
  quickDepositInProgress = false,
  loading = false,
  offscreenElements,
  overScreenNotifications,
  sidebar,
}: Props) => {
  if (error) {
    return error;
  }

  if (loading) {
    return loading;
  }

  return (
    <FullscreenView className="u-height--screen u-width--screen bg-grey-90">
      <VerticalStretcher
        quickDepositInProgress={quickDepositInProgress}
        gameProviderModel={gameProviderModel}
      >
        <Flex
          className="u-width--full u-height--full bg-grey-90 text-white c-game-page"
          direction="vertical"
          spacing="none"
          style={{ backgroundImage: `url('${gameBackground || ""}')` }}
        >
          <Flex.Item>{header}</Flex.Item>
          <Flex
            direction="horizontal"
            spacing="none"
            className="u-padding-x--md@desktop u-padding-bottom--md@desktop u-height--full"
          >
            <Flex.Item>{sidebar}</Flex.Item>
            <Flex.Block className="o-position--relative o-flex c-game-page__flexible-game-container">
              {gameWindow}
              {overScreenNotifications}
            </Flex.Block>
          </Flex>
          <Flex.Item>
            {footer}
            <div className="u-safe-area-inset-padding-bottom"></div>
          </Flex.Item>
        </Flex>
        {offscreenElements}
      </VerticalStretcher>
    </FullscreenView>
  );
};
