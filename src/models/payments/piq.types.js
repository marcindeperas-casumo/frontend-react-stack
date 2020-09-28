// @flow
import { LOCAL_PAYMENT_TYPES } from "./piq.constants";

export type LocalPaymentMethodType = $Values<typeof LOCAL_PAYMENT_TYPES>;

export type CvvValidationEvent = {
  status: string,
  errorType?: string,
  data?: string,
};
