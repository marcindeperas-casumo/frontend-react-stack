// @flow
import { useRef, useState } from "react";
import { useDebounce } from "react-use";
import { useSelector } from "react-redux";
import { WALLET_BALANCE_DELAY_DURATION } from "Models/playing/playing.constants";
import { useGameJackpotActivity } from "Components/GamePage/Hooks/useGameJackpotActivity";
import { useGameJackpotStatusContext } from "Components/GamePage/Contexts";
import { playerBalanceAmountSelector } from "Models/player";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";

export const useThrottledGameBalance = (
  compareFn: (prev: number, next: number, isGameActive: boolean) => boolean
) => {
  const {
    blueRibbonNotificationNeedsAccepting,
  } = useGameJackpotStatusContext();
  const [throttledBalance, setThrottledBalance] = useState(0);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const playerBalanceRef = useRef(playerBalance);
  const jackpotBusy = useGameJackpotActivity();
  const fallbackPlayerBalance = useGameActivityAwareValue(
    playerBalance,
    compareFn
  );
  useDebounce(
    () => {
      // eslint-disable-next-line fp/no-mutation
      playerBalanceRef.current =
        jackpotBusy || blueRibbonNotificationNeedsAccepting
          ? playerBalanceRef.current
          : fallbackPlayerBalance;
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
      setThrottledBalance(playerBalanceRef.current);
    },
    WALLET_BALANCE_DELAY_DURATION,
    [
      blueRibbonNotificationNeedsAccepting,
      jackpotBusy,
      playerBalance,
      throttledBalance,
      fallbackPlayerBalance,
    ]
  );

  return throttledBalance;
};
