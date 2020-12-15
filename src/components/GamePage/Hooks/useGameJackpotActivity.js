import { useMemo, useState, useRef } from "react";
import { WALLET_BALANCE_DELAY_DURATION } from "Models/playing/playing.constants";
import { useGameWalletActivity } from "../Hooks/useGameWalletActivity";

export const useGameJackpotActivity = () => {
  const [gameJackpotBusy, setGameJackpotBusy] = useState(false);
  const awardedBonus = useGameWalletActivity();
  const jackpotDelayTimeoutRef = useRef();

  useMemo(() => {
    if (awardedBonus) {
      setGameJackpotBusy(true);
      async function delayed() {
        // Timeout required in cases like blueribbon where the wallet balance update event is received before the notificationAdded event
        await new Promise(resolve => {
          if (jackpotDelayTimeoutRef.current) {
            clearTimeout(jackpotDelayTimeoutRef.current);
          }
          // eslint-disable-next-line fp/no-mutation
          jackpotDelayTimeoutRef.current = setTimeout(() => {
            setGameJackpotBusy(false);
            resolve();
          }, WALLET_BALANCE_DELAY_DURATION);
        });
      }
      delayed();
    }
  }, [awardedBonus]);

  return gameJackpotBusy;
};
