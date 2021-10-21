import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  playerNetWinningsUpdateSelector,
  playerNetLossesUpdateSelector,
} from "Models/player";
import { winAnimationSelector } from "Models/blueribbonJackpots/jackpots.selectors";
// import { NET_FINANCIAL_POSITION_UPDATE_DELAY } from "Models/playing";

export const useNetFinancialPositionValue = () => {
  const [netFinancialPosition, setNetFinancialPosition] = useState(0);
  const netWinning = useSelector(playerNetWinningsUpdateSelector);
  const netLoss = useSelector(playerNetLossesUpdateSelector);
  const winAnimationRunning = useSelector(winAnimationSelector);

  useEffect(() => {
    if (!winAnimationRunning) {
      setNetFinancialPosition(
        Number((Number(netWinning) - Number(netLoss)).toFixed(2))
      );
    }
  }, [netWinning, netLoss, winAnimationRunning]);

  return netFinancialPosition;
};
