// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { FullscreenView } from "Components/FullscreenView";
import { VerticalStretcher } from "Components/VerticalStretcher";
import type { GameProviderModel } from "GameProviders";

type Props = {
  error: ?React.Node,
  footer: ?React.Node,
  gameBackground?: string,
  gameProviderModel: GameProviderModel,
  gameWindow: ?React.Node,
  header: ?React.Node,
  loading: ?React.Node,
  offscreenElements: ?React.Node,
  overScreenNotifications: ?React.Node,
  sidebar?: React.Node,
};

export const GamePage = ({
  error,
  footer,
  gameBackground = "",
  gameProviderModel,
  gameWindow,
  header,
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
    <FullscreenView className="u-height--full u-width--screen t-background-grey-90">
      <VerticalStretcher gameProviderModel={gameProviderModel}>
        <Flex
          className="u-width--full u-height--full t-background-grey-90 t-color-white c-game-page"
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
            <Flex.Item className="u-padding-right c-game-page__sidebar">
              {sidebar}
            </Flex.Item>
            )}
            <Flex.Block className="u-position-relative o-flex c-game-page__flexible-game-container">
              {gameWindow}
              {overScreenNotifications}
            </Flex.Block>
          </Flex>
          <Flex.Item>{footer}</Flex.Item>
        </Flex>
        {offscreenElements}
      </VerticalStretcher>
    </FullscreenView>
  );
};
