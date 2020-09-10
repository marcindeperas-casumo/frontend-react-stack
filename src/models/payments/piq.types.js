// @flow
import { PIQ_PAYMENT_TYPES } from "./piq.constants";

export type PaymentMethodType = $Keys<typeof PIQ_PAYMENT_TYPES>;

export type CvvValidationEvent = {
  status: string,
  errorType?: string,
  data?: string,
};
