import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  playerNetWinningsUpdateSelector,
  playerNetLossesUpdateSelector,
} from "Models/player";
import { winAnimationSelector } from "Models/blueribbonJackpots/jackpots.selectors";

export const useNetFinancialPositionValue = () => {
  const [netFinancialPosition, setNetFinancialPosition] = useState(0);
  const netWinning = useSelector(playerNetWinningsUpdateSelector);
  const netLoss = useSelector(playerNetLossesUpdateSelector);
  const winAnimationRunning = useSelector(winAnimationSelector);

  useEffect(() => {
    setNetFinancialPosition(Number(Number(netWinning) - Number(netLoss)));
  }, [netWinning, netLoss, winAnimationRunning]);

  return netFinancialPosition;
};
