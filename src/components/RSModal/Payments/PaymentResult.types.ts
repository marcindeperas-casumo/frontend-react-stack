export const PAYMENT_RESULT_STATUS = Object.freeze({
  success: "success",
  fail: "fail",
});

export type PaymentResultStatus = ValueOf<typeof PAYMENT_RESULT_STATUS>;

export type CmsContent = {
  payment_result_success_title: string | undefined;
  payment_result_success_message: string | undefined;
};
