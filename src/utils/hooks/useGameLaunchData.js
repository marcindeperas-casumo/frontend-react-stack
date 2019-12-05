// @flow

import { useRef, useState, useEffect } from "react";
import http from "Lib/http";
import logger from "Services/logger";
import { DEVICES, ENVIRONMENTS } from "Src/constants";
import {
  getGameLaunchParameters,
  getGameProviderName,
} from "Api/api.gameLaunch";
import { getGameModel } from "GameProviders";

type Props = {
  slug: string,
  playForFun: boolean,
  platform: $Values<typeof DEVICES>,
  language: string,
  environment: $Values<typeof ENVIRONMENTS>,
};

export const useGameLaunchData = ({
  slug,
  playForFun,
  platform,
  language,
  environment,
}: Props) => {
  const [gameProviderModel, setGameProviderModel] = useState(null);
  const [failed, setFailed] = useState(false);
  const gameRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { providerGameName } = await getGameProviderName(
          slug,
          platform,
          http
        );
        const { responseData } = await getGameLaunchParameters(
          {
            gameName: providerGameName,
            playForFun,
            platform,
          },
          http
        );
        const gameModel = getGameModel(
          responseData.providedSession.parameters,
          gameRef,
          language,
          environment
        );

        setGameProviderModel(gameModel);
      } catch (e) {
        logger.error("Game launch failed", e);
        setFailed(true);
      }
    })();
  }, [environment, language, platform, playForFun, slug]);

  const pauseGame = (): Promise<void> => {
    if (gameProviderModel) {
      return gameProviderModel.pauseGame().then(() => {
        if (gameRef.current instanceof HTMLIFrameElement) {
          gameRef.current.contentWindow.focus();
        }
      });
    }

    return Promise.reject();
  };

  const resumeGame = () => {
    if (gameProviderModel) {
      gameProviderModel.resumeGame();
    }

    if (gameRef.current instanceof HTMLIFrameElement) {
      gameRef.current.contentWindow.focus();
    }
  };

  return {
    gameProviderModel,
    pauseGame,
    resumeGame,
    error: failed,
  };
};
