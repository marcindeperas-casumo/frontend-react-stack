import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { WALLET_BALANCE_DELAY_DURATION } from "Models/playing/playing.constants";
import { playerBalanceUpdateReasonSelector } from "Models/player";
import { WALLET_UPATE_REASONS } from "Models/player/player.constants";

export const useGameJackpotActivity = () => {
  const walletUpdateReason = useSelector(playerBalanceUpdateReasonSelector);
  const awardedBonus =
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'includes' does not exist on type 'unknow... Remove this comment to see the full error message
    walletUpdateReason?.includes(WALLET_UPATE_REASONS.BONUS_AWARDED) || false;
  const [gameJackpotBusy, setGameJackpotBusy] = useState(awardedBonus);
  const jackpotDelayTimeoutRef = useRef();

  useEffect(() => {
    setGameJackpotBusy(awardedBonus);
    if (awardedBonus) {
      // Timeout required in cases like blueribbon where the wallet balance update event is received before the notificationAdded event
      clearTimeout(jackpotDelayTimeoutRef.current);
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Timeout' is not assignable to type 'undefine... Remove this comment to see the full error message
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
