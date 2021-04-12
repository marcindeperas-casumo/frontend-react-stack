import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import Modal from "@casumo/cmp-modal";
import * as React from "react";
import TrackView from "Components/TrackView";
import { EVENTS, TCurrencyCode } from "Src/constants";
import { stringToHTML, formatCurrency, interpolate } from "Utils";
import PaymentResultFailIcon from "./paymentResultFail.svg";
import PaymentResultSuccessIcon from "./paymentResultSuccess.svg";
import type { CmsContent } from "./PaymentResult.types";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";

type Props = {
  t: CmsContent;
  locale: string;
  currency: TCurrencyCode;
  amount: number;
  closeModal: () => void;
  status: string;
  errorTitle?: string;
  errorMessage?: string;
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

  if (!t) {
    return null;
  }

  const title = isSuccess
    ? interpolate(t.payment_result_success_title || "", {
        amount: formattedAmount,
      })
    : errorTitle;

  const message =
    (isSuccess ? t.payment_result_success_message : errorMessage) || "";

  const mixpanelEvent = isSuccess
    ? EVENTS.MIXPANEL_QUICK_DEPOSIT_STEP_SUCCESS
    : EVENTS.MIXPANEL_QUICK_DEPOSIT_STEP_FAILED;

  return (
    <Modal closeIcon={{ action: closeModal }} spotImage={paymentResultImage}>
      <TrackView eventName={mixpanelEvent} />
      <Text tag="h3" className="u-padding u-margin-top--lg u-text-align-center">
        {title}
      </Text>
      <Text
        className="u-padding u-text-align-center"
        dangerouslySetInnerHTML={stringToHTML(message)}
      ></Text>
    </Modal>
  );
};
