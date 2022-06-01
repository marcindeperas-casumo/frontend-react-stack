import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { playerBalanceAmountSelector } from "Models/player";

const WIN_DELAY = 120000;

export const useSimulatedGameActivity = (
  onGameActivityChange: (isActive: boolean) => void
) => {
  const [gameActive, setGameActive] = useState(false);
  const [simulatedGameActivityEnabled, setSimulatedGameActivityEnabled] =
    useState(false);
  const timeoutRef = useRef();
  const currentWalletAmount = useSelector(playerBalanceAmountSelector);
  const previousWalletAmount = useRef(currentWalletAmount);
  const flushGameRound = () => {
    clearTimeout(timeoutRef.current);
    // eslint-disable-next-line fp/no-mutation
    timeoutRef.current = null;
  };
  const enableSimulatedGameActivity = () => {
    setSimulatedGameActivityEnabled(true);
  };
  const disableSimulatedGameActivity = () => {
    setSimulatedGameActivityEnabled(false);
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
    if (simulatedGameActivityEnabled) {
      if (previousWalletAmount.current > currentWalletAmount) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);

          // @ts-expect-error ts-migrate(2322) FIXME: Type 'Timeout' is not assignable to type 'undefine... Remove this comment to see the full error message
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
      previousWalletAmount.current = currentWalletAmount;
    }
  }, [simulatedGameActivityEnabled, currentWalletAmount, onChange]);

  useEffect(() => {
    if (gameActive) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Timeout' is not assignable to type 'undefine... Remove this comment to see the full error message
      // eslint-disable-next-line fp/no-mutation
      timeoutRef.current = setTimeout(() => {
        onChange(false);
        flushGameRound();
      }, WIN_DELAY);
    }
  }, [gameActive, onChange]);

  return {
    disableSimulatedGameActivity,
    enableSimulatedGameActivity,
  };
};
