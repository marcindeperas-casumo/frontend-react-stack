// @flow

import React, { useEffect } from "react";
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
