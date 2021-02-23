// @flow

import React, { useEffect } from "react";
// @ts-expect-error ts-migrate(1149) FIXME: File name '/Users/michalmokijewski/Projects/casumo... Remove this comment to see the full error message
import type { GameProviderModel } from "GameProviders";

type Props = {
  className?: string,
  gameProviderModel: GameProviderModel,
};

export const GameLauncher = ({ className, gameProviderModel }: Props) => {
  useEffect(() => {
    if (gameProviderModel) {
      gameProviderModel.onMount();

      return gameProviderModel.onUnmount;
    }
  }, [gameProviderModel]);

  if (!gameProviderModel) {
    return null;
  }

  const { componentTag: GameComponent, componentProps } = gameProviderModel;

  return <GameComponent {...componentProps} className={className} />;
};
