// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { FullscreenView } from "Components/FullscreenView";
import { VerticalStretcher } from "Components/VerticalStretcher";
// @ts-expect-error ts-migrate(1149) FIXME: File name '/Users/michalmokijewski/Projects/casumo... Remove this comment to see the full error message
import type { GameProviderModel } from "GameProviders";

type Props = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error: ?React.Node,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  footer: ?React.Node,
  gameBackground?: string,
  gameProviderModel: GameProviderModel,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  gameWindow: ?React.Node,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  header: ?React.Node,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  loading: ?React.Node,
  quickDepositInProgress: boolean,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  offscreenElements: ?React.Node,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  overScreenNotifications: ?React.Node,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  sidebar?: React.Node,
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
    <FullscreenView className="u-height--screen u-width--screen t-background-grey-90">
      {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ children: any[]; quickDepositInProgress: b... Remove this comment to see the full error message */}
      <VerticalStretcher
        quickDepositInProgress={quickDepositInProgress}
        gameProviderModel={gameProviderModel}
      >
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
            <Flex.Item>{sidebar}</Flex.Item>
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
