import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logger from "Services/logger";
import {
  getGameLaunchParameters,
  getGameProviderName,
} from "Api/api.gameLaunch";
import { showModal } from "Models/modal";
import { getGameModel } from "GameProviders";
import {
  ENVIRONMENTS,
  REACT_APP_MODAL,
  DEFAULT_EXCLUDED_GAME_ERROR_CODE,
} from "Src/constants";
import { isTestEnv, getPlatform } from "Utils";
import { useUrlPrefix } from "Utils/hooks";
import { languageSelector } from "Models/handshake";

type Props = {
  slug: string;
  playForFun: boolean;
  remoteGameLaunchData: Object | undefined;
};

/* eslint-disable sonarjs/cognitive-complexity */
export const useGameLaunchData = ({
  slug,
  playForFun,
  remoteGameLaunchData,
}: Props) => {
  const [gameProviderModel, setGameProviderModel] = useState(null);
  const [failed, setFailed] = useState(false);
  const gameRef = useRef(null);
  const environment = isTestEnv() ? ENVIRONMENTS.TEST : ENVIRONMENTS.PRODUCTION;
  const language = useSelector(languageSelector);
  const urlPrefix = useUrlPrefix();
  const platform = getPlatform();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!remoteGameLaunchData) {
      (async () => {
        try {
          const { providerGameName } = await getGameProviderName(
            slug,
            platform
          );
          const { responseData } = await getGameLaunchParameters({
            gameName: providerGameName,
            playForFun,
            platform,
          });
          if (
            responseData &&
            responseData.providedSession.parameters &&
            responseData.providedSession.parameters.errorCode ===
              DEFAULT_EXCLUDED_GAME_ERROR_CODE
          ) {
            dispatch(showModal(REACT_APP_MODAL.ID.EXCLUDED_GAME, {}));
            return;
          }
          setGameProviderModel(
            getGameModel(
              responseData.providedSession.parameters,
              gameRef,
              language,
              environment,
              urlPrefix
            )
          );
        } catch (e) {
          logger.error("Game launch failed", e);
          setFailed(true);
        }
      })();
    }

    return () => {
      setGameProviderModel(null);
    };
  }, [
    environment,
    language,
    playForFun,
    remoteGameLaunchData,
    slug,
    platform,
    urlPrefix,
    dispatch,
  ]);

  const determineWhichGameProviderModel = () => {
    return remoteGameLaunchData
      ? // @ts-expect-error ts-migrate(2554) FIXME: Expected 5 arguments, but got 4.
        getGameModel(remoteGameLaunchData, gameRef, language, environment)
      : gameProviderModel;
  };

  const pauseGame = (): Promise<void> => {
    const model = determineWhichGameProviderModel();
    if (model) {
      return model.pauseGame().then(() => {
        if (gameRef.current instanceof HTMLIFrameElement) {
          gameRef.current.contentWindow.focus();
        }
      });
    }

    return Promise.reject();
  };

  const resumeGame = () => {
    const model = determineWhichGameProviderModel();
    if (model) {
      model.resumeGame();
    }

    if (gameRef.current instanceof HTMLIFrameElement) {
      gameRef.current.contentWindow.focus();
    }
  };

  return {
    gameProviderModel: determineWhichGameProviderModel(),
    pauseGame,
    resumeGame,
    error: failed,
  };
};
/* eslint-enable sonarjs/cognitive-complexity */
