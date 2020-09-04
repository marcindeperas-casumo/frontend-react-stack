// @flow
import { PIQ } from "./piq.constants";

export type PaymentMethodType = $Keys<typeof PIQ.types>;

export type CvvValidationEvent = {
  status: string,
  errorType?: string,
  data?: string,
};
