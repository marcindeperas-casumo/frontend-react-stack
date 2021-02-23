// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslations, useTranslationsGql } from "Utils/hooks";
import { localeSelector } from "Models/handshake";
import { playerCurrencySelector } from "Models/player";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";
import { PaymentResult } from "./PaymentResult";

const cmsKeyPrefix = "root:shared.payment-result:fields.";

type TCmsError = {
  error_code: string,
  error_message: string,
  error_custom_title: string,
};

const getErrorByCode = (
  errorKeys: Array<string>,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  cmsErrors: ?Array<TCmsError>
) => {
  const matchingErrors = (cmsErrors || []).filter(
    cmsError =>
      errorKeys.includes(cmsError.error_code) && cmsError.error_message
  );

  return matchingErrors[0];
};

type Props = {
  closeModal: () => void,
  config: any,
};

export const PaymentResultContainer = ({ closeModal, config }: Props) => {
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);

  const piqErrors = useTranslations("shared.paymentiq-error-messages");

  const { t, loading } = useTranslationsGql({
    payment_result_success_title: `${cmsKeyPrefix}success_title`,
    payment_result_success_message: `${cmsKeyPrefix}success_message`,
  });

  const { status, amount, errorKeys } = config;

  const isSuccess = status === PAYMENT_RESULT_STATUS.success;
  const isFailure = status === PAYMENT_RESULT_STATUS.fail;

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'error_responses' does not exist on type ... Remove this comment to see the full error message
  if ((isSuccess && loading) || (isFailure && !piqErrors?.error_responses)) {
    return null;
  }

  const specificError =
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'error_responses' does not exist on type ... Remove this comment to see the full error message
    errorKeys && getErrorByCode(errorKeys, piqErrors?.error_responses);

  const errorTitle = specificError
    ? specificError.error_custom_title
    : // @ts-expect-error ts-migrate(2339) FIXME: Property 'error_title' does not exist on type 'unk... Remove this comment to see the full error message
      piqErrors?.error_title;
  const errorMessage = specificError
    ? specificError.error_message
    : // @ts-expect-error ts-migrate(2339) FIXME: Property 'unexpected_error_message' does not exist... Remove this comment to see the full error message
      piqErrors?.unexpected_error_message;

  return (
    <PaymentResult
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
      t={t}
      locale={locale}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
      currency={currency}
      amount={amount}
      closeModal={closeModal}
      status={status}
      errorTitle={errorTitle}
      errorMessage={errorMessage}
    />
  );
};
