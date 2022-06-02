import { TVerificationItem } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { mapConstantToParameter } from "@casumo/frontend-kyc/dist/shared/router.mappers";
import { mapItemToDefiningType } from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";

export const EMPTY_ID_SYMBOL = "-";

export const mapItemToParams = (item: TVerificationItem) => ({
  type: mapConstantToParameter(mapItemToDefiningType(item)), // @ts-ignore
  id: item?.method?.id || EMPTY_ID_SYMBOL,
});
