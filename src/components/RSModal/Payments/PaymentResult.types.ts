// @flow
export const PAYMENT_RESULT_STATUS = Object.freeze({
  success: "success",
  fail: "fail",
});

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type PaymentResultStatus = $Values<typeof PAYMENT_RESULT_STATUS>;

export type CmsContent = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  payment_result_success_title: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  payment_result_success_message: ?string,
};
