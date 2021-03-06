import { useParams } from "@reach/router";
import { mapItemToDefiningType } from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";
import { mapConstantToParameter } from "@casumo/frontend-kyc/dist/shared/router.mappers";
import { useGetVerificationItems } from "./useGetVerificationItems";

export function useGetVerificationItem() {
  const params = useParams();
  const items = useGetVerificationItems();

  return items
    ? items.find(
        i =>
          mapConstantToParameter(mapItemToDefiningType(i)) === params.type && // @ts-ignore
          (i.method ? i.method.id === params.id : true)
      )
    : null;
}
