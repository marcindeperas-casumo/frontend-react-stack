import { useSelector } from "react-redux";
import { playerBalanceUpdateReasonSelector } from "Models/player";
import { WALLET_UPATE_REASONS } from "Models/player/player.constants";

export const useGameWalletActivity = () => {
  const walletUpdateReason = useSelector(playerBalanceUpdateReasonSelector);
  return (
    walletUpdateReason?.includes(WALLET_UPATE_REASONS.BONUS_AWARDED) || false
  );
};
