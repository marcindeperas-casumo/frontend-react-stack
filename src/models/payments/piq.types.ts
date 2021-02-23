// @flow
import { LOCAL_PAYMENT_TYPES } from "./piq.constants";

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type LocalPaymentMethodType = $Values<typeof LOCAL_PAYMENT_TYPES>;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Keys'.
export type LocalPaymentMethodTypeKeys = $Keys<typeof LOCAL_PAYMENT_TYPES>;

export type CvvValidationEvent = {
  status: string,
  errorType?: string,
  data?: string,
};
