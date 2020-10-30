// @flow
export const PAYMENT_RESULT_STATUS = Object.freeze({
  success: "success",
  fail: "fail",
});

export type PaymentResultStatus = $Values<typeof PAYMENT_RESULT_STATUS>;

export type CmsContent = {
  payment_result_success_title: string,
  payment_result_success_message: string,
};
