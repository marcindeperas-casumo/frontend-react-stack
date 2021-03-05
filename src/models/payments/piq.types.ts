import { LOCAL_PAYMENT_TYPES } from "./piq.constants";

export type LocalPaymentMethodTypeKeys = keyof typeof LOCAL_PAYMENT_TYPES;
export type LocalPaymentMethodType = LocalPaymentMethodTypeKeys;

export type CvvValidationEvent = {
  status: string;
  errorType?: string;
  data?: string;
};
