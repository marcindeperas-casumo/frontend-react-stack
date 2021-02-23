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

  if ((isSuccess && loading) || (isFailure && !piqErrors?.error_responses)) {
    return null;
  }

  const specificError =
    errorKeys && getErrorByCode(errorKeys, piqErrors?.error_responses);

  const errorTitle = specificError
    ? specificError.error_custom_title
    : piqErrors?.error_title;
  const errorMessage = specificError
    ? specificError.error_message
    : piqErrors?.unexpected_error_message;

  return (
    <PaymentResult
      t={t}
      locale={locale}
      currency={currency}
      amount={amount}
      closeModal={closeModal}
      status={status}
      errorTitle={errorTitle}
      errorMessage={errorMessage}
    />
  );
};
