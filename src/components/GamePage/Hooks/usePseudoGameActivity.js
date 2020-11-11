// @flow

import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { playerBalanceAmountSelector } from "Models/player";

const WIN_DELAY = 120000;

export const usePseudoGameActivity = onGameActivityChange => {
  const [gameActive, setGameActive] = useState(false);
  const [pseudoGameActivityEnabled, setPseudoGameActivityEnabled] = useState(
    false
  );
  const timeoutRef = useRef();
  const currentWalletAmount = useSelector(playerBalanceAmountSelector);
  const previousRef = useRef(currentWalletAmount);
  const flushGameRound = () => {
    clearTimeout(timeoutRef.current);
    // eslint-disable-next-line fp/no-mutation
    timeoutRef.current = null;
  };
  const enablePseudoGameActivity = () => {
    setPseudoGameActivityEnabled(true);
  };
  const disablePseudoGameActivity = () => {
    setPseudoGameActivityEnabled(false);
    flushGameRound();
  };
  const onChange = useCallback(
    (isActive: boolean) => {
      onGameActivityChange(isActive);
      setGameActive(isActive);
    },
    [onGameActivityChange, setGameActive]
  );

  useEffect(() => {
    if (pseudoGameActivityEnabled) {
      if (previousRef.current > currentWalletAmount) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);

          // eslint-disable-next-line fp/no-mutation
          timeoutRef.current = setTimeout(() => {
            onChange(false);
            flushGameRound();
          }, WIN_DELAY);
        } else {
          onChange(true);
        }
      }

      // eslint-disable-next-line fp/no-mutation
      previousRef.current = currentWalletAmount;
    }
  }, [pseudoGameActivityEnabled, currentWalletAmount, onChange]);

  useEffect(() => {
    if (gameActive) {
      // eslint-disable-next-line fp/no-mutation
      timeoutRef.current = setTimeout(() => {
        onChange(false);
        flushGameRound();
      }, WIN_DELAY);
    }
  }, [gameActive, onChange]);

  return {
    disablePseudoGameActivity,
    enablePseudoGameActivity,
  };
};
