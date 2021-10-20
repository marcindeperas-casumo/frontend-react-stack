import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  playerNetWinningsUpdateSelector,
  playerNetLossesUpdateSelector,
} from "Models/player";

export const useNetFinancialPositionValue = () => {
  const [netFinancialPosition, setNetFinancialPosition] = useState(0);
  const netWinning = useSelector(playerNetWinningsUpdateSelector);
  const netLoss = useSelector(playerNetLossesUpdateSelector);

  useEffect(() => {
    setNetFinancialPosition(Number(netWinning) - Number(netLoss));
  }, [netWinning, netLoss]);

  return netFinancialPosition;
};
