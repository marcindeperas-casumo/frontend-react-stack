//@flow
import * as React from "react";
import { useSelector } from "react-redux";
import Modal from "@casumo/cmp-modal";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { formatCurrency, interpolate } from "Utils";
import { localeSelector } from "Models/handshake";
import { playerCurrencySelector } from "Models/player";
import PaymentResultFailIcon from "./paymentResultFail.svg";
import PaymentResultSuccessIcon from "./paymentResultSuccess.svg";
import {
  type PaymentResultProps,
  PAYMENT_RESULT_STATUS,
} from "./PaymentResult.types";

export const PaymentResult = ({
  closeModal,
  config,
  t,
}: PaymentResultProps) => {
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);

  const { status, amount } = config;

  const isSuccess = status === PAYMENT_RESULT_STATUS.success;

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
          : t?.payment_result_title_fail}
      </Text>
      <Text className="u-padding u-text-align-center">
        {isSuccess
          ? t?.payment_result_content_success
          : t?.payment_result_content_fail}
      </Text>
    </Modal>
  );
};
