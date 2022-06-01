import { useSelector } from "react-redux";
import { TPaymentMethod } from "@casumo/frontend-kyc/dist/shared/payments/payments.types";
import { TVerificationItem } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { playerIdSelector, savedMethodsSelector } from "Models/handshake";
import { useGetVerificationItemsQuery } from "./../kyc.api";

export function useGetVerificationItems() {
  const playerId = useSelector(playerIdSelector) as string;
  const methods = useSelector(savedMethodsSelector);
  const { data } = useGetVerificationItemsQuery(playerId);

  const items = data?.map(item =>
    item.paymentMethodId
      ? {
          ...item,
          // @ts-ignore
          method: methods.find(
            (m: TPaymentMethod) => m.id === item.paymentMethodId
          ),
        }
      : item
  ) as Array<TVerificationItem>;

  return items || [];
}
