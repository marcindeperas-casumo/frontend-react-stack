// @flow

import { useRef, useState, useEffect } from "react";
import { isMobile } from "@casumo/is-mobile";
import { useSelector } from "react-redux";
import logger from "Services/logger";
import {
  getGameLaunchParameters,
  getGameProviderName,
} from "Api/api.gameLaunch";
import { getGameModel } from "GameProviders";
import { ENVIRONMENTS, DEVICES } from "Src/constants";
import { isTestEnv } from "Utils";
import { languageSelector } from "Models/handshake";

type Props = {
  slug: string,
  playForFun: boolean,
  bundleLocation: ?string,
};

const platform = isMobile(window) ? DEVICES.MOBILE : DEVICES.DESKTOP;

export const useGameLaunchData = ({
  slug,
  playForFun,
  bundleLocation,
}: Props) => {
  const [gameProviderModel, setGameProviderModel] = useState(null);
  const [failed, setFailed] = useState(false);
  const gameRef = useRef(null);
  const environment = isTestEnv() ? ENVIRONMENTS.TEST : ENVIRONMENTS.PRODUCTION;
  const language = useSelector(languageSelector);

  useEffect(() => {
    (async () => {
      try {
        const { providerGameName } = await getGameProviderName(slug, platform);
        const { responseData } = await getGameLaunchParameters({
          gameName: providerGameName,
          playForFun,
          platform,
        });

        const gameModel = getGameModel(
          {
            ...responseData.providedSession.parameters,
            ...(bundleLocation && { url: bundleLocation, isEmbedded: true }),
          },
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

    return () => {
      setGameProviderModel(null);
    };
  }, [bundleLocation, environment, language, playForFun, slug]);

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
