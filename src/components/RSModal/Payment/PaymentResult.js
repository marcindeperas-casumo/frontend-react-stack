// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector } from "react-redux";
import Modal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { formatCurrency, interpolate } from "Utils";
import { useTranslations, useTranslationsGql } from "Utils/hooks";
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

const cmsKeyPrefix = "root:shared.payment-result:fields.";

export const PaymentResult = ({ closeModal, config }: PaymentResultProps) => {
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);

  const errors = useTranslations("shared.paymentiq-error-messages");

  const { t } = useTranslationsGql({
    payment_result_success_title: `${cmsKeyPrefix}success_title`,
    payment_result_success_message: `${cmsKeyPrefix}success_message`,
  });

  const { status, amount, errorCode = null } = config;

  const isSuccess = status === PAYMENT_RESULT_STATUS.success;
  const cmsError = getCmsError(errorCode, errors.error_responses);

  const errorTitle = cmsError ? cmsError.error_title : errors.error_title;
  const errorMessage = cmsError ? cmsError.error_message : errors.error_message;

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
          ? interpolate(t?.payment_result_success_title, {
              amount: formattedAmount,
            })
          : errorTitle}
      </Text>
      <Text className="u-padding u-text-align-center">
        {isSuccess ? t?.payment_result_success_message : errorMessage}
      </Text>
    </Modal>
  );
};
