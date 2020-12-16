import { useMemo, useState, useRef } from "react";
import { WALLET_BALANCE_DELAY_DURATION } from "Models/playing/playing.constants";
import { useGameWalletActivity } from "../Hooks/useGameWalletActivity";

export const useGameJackpotActivity = () => {
  const awardedBonus = useGameWalletActivity();
  const [gameJackpotBusy, setGameJackpotBusy] = useState(awardedBonus);
  const jackpotDelayTimeoutRef = useRef();

  useMemo(() => {
    if (awardedBonus) {
      setGameJackpotBusy(true);
      // Timeout required in cases like blueribbon where the wallet balance update event is received before the notificationAdded event
      clearTimeout(jackpotDelayTimeoutRef.current);
      // eslint-disable-next-line fp/no-mutation
      jackpotDelayTimeoutRef.current = setTimeout(() => {
        setGameJackpotBusy(false);
      }, WALLET_BALANCE_DELAY_DURATION);
    }

    return () => {
      clearTimeout(jackpotDelayTimeoutRef.current);
    };
  }, [awardedBonus]);

  return gameJackpotBusy;
};
