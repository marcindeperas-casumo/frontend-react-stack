import { useSelector } from "react-redux";
import { walletAmountSelector, currencySelector } from "Models/handshake";

type UseWalletAmountType = {
  amount: number;
  currency: string;
};

export function useWalletAmount(): UseWalletAmountType {
  const amount = useSelector(walletAmountSelector);
  const currency = useSelector(currencySelector);

  return {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'number'.
    amount,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
    currency,
  };
}
