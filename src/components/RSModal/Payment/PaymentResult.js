// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector } from "react-redux";
import Modal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { formatCurrency, interpolate } from "Utils";
import { useTranslations } from "Utils/hooks";
import { localeSelector } from "Models/handshake";
import { playerCurrencySelector } from "Models/player";
import PaymentResultFailIcon from "./paymentResultFail.svg";
import PaymentResultSuccessIcon from "./paymentResultSuccess.svg";
import {
  type PaymentResultProps,
  PAYMENT_RESULT_STATUS,
} from "./PaymentResult.types";

const getCmsError = R.curry((errorCode, errors) =>
  R.pipe(R.find(R.propEq("error_code", errorCode)))(errors)
);

export const PaymentResult = ({
  closeModal,
  config,
  t,
}: PaymentResultProps) => {
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);

  const {
    error_responses,
    error_title: fallback_error_title,
    unexpected_error_message: fallback_error_message,
  } = useTranslations("shared.paymentiq-error-messages");

  const { status, amount, errorCode = null } = config;

  const isSuccess = status === PAYMENT_RESULT_STATUS.success;
  const cmsError = errorCode ? getCmsError(errorCode)(error_responses) : null;

  const errorTitle = cmsError?.error_title | fallback_error_title;
  const errorMessage = cmsError?.error_message | fallback_error_message;

  const paymentResultImage = (
    <Flex align="center" justify="center">
      {isSuccess ? <PaymentResultSuccessIcon /> : <PaymentResultFailIcon />}
    </Flex>
  );

  const formattedAmount = formatCurrency({
    locale,
    currency,
    value: amount,
  });

  return (
    <Modal closeIcon={{ action: closeModal }} spotImage={paymentResultImage}>
      <Text tag="h3" className="u-padding u-margin-top--lg u-text-align-center">
        {isSuccess
          ? interpolate(t?.payment_result_title_success, {
              amount: formattedAmount,
            })
          : errorTitle}
      </Text>
      <Text className="u-padding u-text-align-center">
        {isSuccess ? t?.payment_result_content_success : errorMessage}
      </Text>
    </Modal>
  );
};
