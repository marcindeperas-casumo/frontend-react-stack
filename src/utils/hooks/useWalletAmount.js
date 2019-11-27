// @flow
import { useSelector } from "react-redux";
import { walletAmountSelector, currencySelector } from "Models/handshake";

type UseWalletAmountType = {
  amount: number,
  currency: string,
};

export function useWalletAmount(): UseWalletAmountType {
  const amount = useSelector(walletAmountSelector);
  const currency = useSelector(currencySelector);

  return {
    amount,
    currency,
  };
}
