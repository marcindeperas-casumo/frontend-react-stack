// @flow
export const PAYMENT_RESULT_STATUS = Object.freeze({
  success: "success",
  fail: "fail",
});

export type PaymentResultStatus = $Values<typeof PAYMENT_RESULT_STATUS>;

export type PaymentResultProps = {
  closeModal: () => void,
  config: any,
};
