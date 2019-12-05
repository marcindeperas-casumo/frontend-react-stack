// @flow

import React, { useEffect } from "react";
import { useGameLaunchData } from "Utils/hooks";

type Props = {
  className?: string,
  environment: string,
  language: string,
  onError?: (error: any) => {},
  platform: string,
  playForFun: boolean,
  slug: string,
};

export const GameLauncher = ({
  className,
  environment,
  language,
  onError,
  platform,
  playForFun,
  slug,
}: Props) => {
  const { gameProviderModel, error } = useGameLaunchData({
    slug,
    playForFun,
    platform,
    language,
    environment,
  });

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (gameProviderModel && !error) {
      gameProviderModel.onMount();

      return gameProviderModel.onUnmount;
    }
  }, [error, gameProviderModel]);

  if (error || !gameProviderModel) {
    return null;
  }

  const { componentTag: GameComponent, componentProps } = gameProviderModel;

  return <GameComponent {...componentProps} className={className} />;
};
