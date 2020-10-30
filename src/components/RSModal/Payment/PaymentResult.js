// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import Modal from "@casumo/cmp-modal";
import { formatCurrency, interpolate } from "Utils";
import PaymentResultFailIcon from "./paymentResultFail.svg";
import PaymentResultSuccessIcon from "./paymentResultSuccess.svg";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";

type Props = {
  t: CmsContent,
  locale: string,
  currency: string,
  amount: number,
  closeModal: () => void,
  status: string,
  errorTitle?: string,
  errorMessage?: string,
};

export const PaymentResult = ({
  t,
  locale,
  currency,
  amount,
  closeModal,
  status,
  errorTitle,
  errorMessage,
}: Props) => {
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
          ? interpolate(t.payment_result_success_title, {
              amount: formattedAmount,
            })
          : errorTitle}
      </Text>
      <Text className="u-padding u-text-align-center">
        {isSuccess ? t.payment_result_success_message : errorMessage}
      </Text>
    </Modal>
  );
};
