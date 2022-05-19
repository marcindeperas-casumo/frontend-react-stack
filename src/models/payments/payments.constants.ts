export const actionTypes = {
  SET_QUICK_DEPOSIT_METHOD: "PAYMENTS/SET_QUICK_DEPOSIT_METHOD",
  START_QUICK_DEPOSIT: "PAYMENTS/START_QUICK_DEPOSIT",
  SET_PAYMENT_REQUEST_STATE: "PAYMENTS/SET_PAYMENT_REQUEST_STATE",
  PIQ_IFRAME_RESOLVE: "PAYMENTS/PIQ_IFRAME_RESOLVE",
  PAYMENT_USE_ERROR: "PAYMENTS/PAYMENT_USE_ERROR",
  PAYMENT_USE_SUCCESS: "PAYMENTS/PAYMENT_USE_SUCCESS",
};

export const requestState = {
  NONE: "NONE",
  PROCESSING: "PROCESSING",
  FINISHED: "FINISHED",
};

export const requestStateMessageType = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const blockOrigins = {
  KYC: "KYC",
  PAYMENT_BLOCK: "PAYMENT_BLOCK",
  PIQ_CATEGORY: "PIQ_CATEGORY",
  DK_VERIFIER: "DK_VERIFIER",
  BIN_BLOCK: "BIN_BLOCK",
};
