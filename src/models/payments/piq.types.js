// @flow
import { PIQ } from "./piq.constants";

export type PaymentMethodType = $Keys<typeof PIQ.types>;

export type CvvErrorType = $Keys<typeof PIQ.encryptedIframe.errorCodeToVoca>;

export type CvvValidationEvent = {
  status: string,
  errorType?: CvvErrorType,
  data?: string,
};
