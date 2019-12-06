// @flow

import React, { useEffect } from "react";

type Props = {
  className?: string,
  gameProviderModel: any,
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
