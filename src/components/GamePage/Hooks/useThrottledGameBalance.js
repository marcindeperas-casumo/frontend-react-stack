import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGameJackpotActivity } from "Components/GamePage/Hooks/useGameJackpotActivity";
import { useGameJackpotStatusContext } from "Components/GamePage/Contexts";
import { playerBalanceAmountSelector } from "Models/player";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";

export const useThrottledGameBalance = compareFn => {
  const {
    blueRibbonNotificationNeedsAccepting,
  } = useGameJackpotStatusContext();
  const [balanceToReturn, setBalanceToReturn] = useState(0);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const playerBalanceRef = useRef(playerBalance);
  const jackpotBusy = useGameJackpotActivity();
  const fallbackPlayerBalance = useGameActivityAwareValue(
    playerBalance,
    compareFn
  );
  useEffect(() => {
    // Wait for balance "blockers" to resolve before using useGameActivityAware balance
    // eslint-disable-next-line fp/no-mutation
    playerBalanceRef.current =
      jackpotBusy || blueRibbonNotificationNeedsAccepting
        ? playerBalanceRef.current
        : fallbackPlayerBalance;
    setBalanceToReturn(playerBalanceRef.current);
  }, [
    blueRibbonNotificationNeedsAccepting,
    jackpotBusy,
    playerBalance,
    balanceToReturn,
    fallbackPlayerBalance,
  ]);

  return balanceToReturn;
};
