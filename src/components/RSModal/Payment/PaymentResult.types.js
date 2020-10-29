// @flow
export const PAYMENT_RESULT_STATUS = Object.freeze({
  success: "success",
  fail: "fail",
});

export type PaymentResultStatus = $Values<typeof PAYMENT_RESULT_STATUS>;

export type CmsContent = {
  payment_result_title_success: string,
  payment_result_title_fail: string,
  payment_result_content_success: string,
  payment_result_content_fail: string,
};

export type PaymentResultProps = {
  t: ?CmsContent,
  closeModal: () => void,
  config: any,
};
