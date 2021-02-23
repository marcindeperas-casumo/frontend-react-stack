// @flow
import { useState, useEffect } from "react";
import {
  GAME_ACTIVE_EVENT_NAME,
  GAME_IDLE_EVENT_NAME,
  GAME_ACTIVITY_STATUS_SOURCE,
  GAME_ELEMENT_ACTIVITY_STATUS_SOURCE_ATTRIBUTE,
// @ts-expect-error ts-migrate(1149) FIXME: File name '/Users/michalmokijewski/Projects/casumo... Remove this comment to see the full error message
} from "../../../gameProviders";
import { useSimulatedGameActivity } from "../Hooks/useSimulatedGameActivity";
import { useGameModelContext } from "../Contexts/GameModelContext";

const addGameActivityListeners = (
  gameElement,
  activeCallback,
  idleCallback
) => {
  gameElement.addEventListener(GAME_ACTIVE_EVENT_NAME, activeCallback);
  gameElement.addEventListener(GAME_IDLE_EVENT_NAME, idleCallback);
};

const removeGameActivityListeners = (
  gameElement,
  activeCallback,
  idleCallback
) => {
  gameElement.removeEventListener(GAME_ACTIVE_EVENT_NAME, activeCallback);
  gameElement.removeEventListener(GAME_IDLE_EVENT_NAME, idleCallback);
};

export const useGameActivityStatus = () => {
  const { gameProviderModel } = useGameModelContext();
  const [active, setActive] = useState(false);

  const {
    enableSimulatedGameActivity,
    disableSimulatedGameActivity,
  } = useSimulatedGameActivity(setActive);

  useEffect(() => {
    if (gameProviderModel && gameProviderModel.props.gameRef.current) {
      const { current: gameElement } = gameProviderModel.props.gameRef;
      const gameManagesActivityStatus =
        gameElement.getAttribute(
          GAME_ELEMENT_ACTIVITY_STATUS_SOURCE_ATTRIBUTE
        ) === GAME_ACTIVITY_STATUS_SOURCE.GAME;
      const setAsActiveCallback = () => {
        setActive(true);
      };
      const setAsIdleCallback = () => {
        setActive(false);
      };

      if (gameManagesActivityStatus) {
        addGameActivityListeners(
          gameElement,
          setAsActiveCallback,
          setAsIdleCallback
        );

        return () => {
          removeGameActivityListeners(
            gameElement,
            setAsActiveCallback,
            setAsIdleCallback
          );
        };
      } else {
        enableSimulatedGameActivity();

        return disableSimulatedGameActivity;
      }
    }
  }, [
    disableSimulatedGameActivity,
    enableSimulatedGameActivity,
    gameProviderModel,
  ]);

  return active;
};
