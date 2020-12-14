// @flow
import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { WALLET_BALANCE_DELAY_DURATION } from "Models/playing/playing.constants";
import { playerBalanceAmountSelector } from "Models/player";
import {
  GAME_ACTIVE_EVENT_NAME,
  GAME_IDLE_EVENT_NAME,
  GAME_ACTIVITY_STATUS_SOURCE,
  GAME_ELEMENT_ACTIVITY_STATUS_SOURCE_ATTRIBUTE,
} from "../../../gameProviders";
import { useSimulatedGameActivity } from "../Hooks/useSimulatedGameActivity";
import { useGameBonusActivity } from "../Hooks/useGameBonusActivity";
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
  const [gameBonusBusy, setGameBonusBusy] = useState(false);
  const awardedBonus = useGameBonusActivity();
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const {
    enableSimulatedGameActivity,
    disableSimulatedGameActivity,
  } = useSimulatedGameActivity(setActive);
  const bonusBusyTimeoutRef = useRef();

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

  useMemo(() => {
    if (awardedBonus) {
      setGameBonusBusy(true);
      async function delayed() {
        // Timeout required in cases like blueribbon where the wallet event is received before the notification event
        await new Promise(resolve => {
          if (bonusBusyTimeoutRef.current) {
            clearTimeout(bonusBusyTimeoutRef.current);
          }
          // eslint-disable-next-line fp/no-mutation
          bonusBusyTimeoutRef.current = setTimeout(() => {
            setGameBonusBusy(false);
            resolve();
          }, WALLET_BALANCE_DELAY_DURATION);
        });
      }
      delayed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awardedBonus, playerBalance]);

  return active || gameBonusBusy;
};
