import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import TextInput from "@casumo/cmp-text-input";
import { ButtonPrimary } from "@casumo/cmp-button";
import classNames from "classnames";
import * as R from "ramda";
import * as React from "react";
import { CvvCodeIframe } from "Components/Payments/CvvCodeIframe";
import { EVENTS } from "Src/constants";
import TrackClick from "Components/TrackClick";
import { requestState } from "Models/payments/payments.constants";
import { useQuickDepositSlipForm } from "./QuickDepositSlip.hooks";
import type { QuickDepositSlipProps } from "./QuickDepositSlip.types";

import "./QuickDepositSlip.scss";

const errorTranslations = R.pickBy((v, k) => !R.isEmpty(R.match(/error_/, k)));

export const QuickDepositSlip = ({
  currencySymbol,
  minAmount,
  maxAmount,
  presetAmount,
  requestStatus,
  onDeposit,
  renderPaymentMethodDetails: PaymentMethodComponent,
  translations: t,
}: QuickDepositSlipProps) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'deposit_cta_text' does not exist on type... Remove this comment to see the full error message
  const { deposit_cta_text, cvv_helper_text, deposit_helper_text } = R.map(
    v => v || ""
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'QuickDepositSlipTranslations' is... Remove this comment to see the full error message
  )(t);

  const {
    depositValue,
    formErrors,
    cvvValue,
    onAmountChange,
    onCvvIframeCallback,
  } = useQuickDepositSlipForm({
    minAmount,
    maxAmount,
    presetAmount,
    translations: errorTranslations(t),
  });

  const onDepositClick = () => {
    if (depositValue && cvvValue) {
      onDeposit(depositValue, cvvValue);
    }
  };

  const onCvvError = message =>
    onCvvIframeCallback({
      status: "error",
      errorType: message,
    });

  const onCvvSuccess = message =>
    onCvvIframeCallback({
      data: message,
      status: "success",
    });

  const isProcessing = requestStatus.state === requestState.PROCESSING;
  const hasErrors = !R.isEmpty(formErrors);

  const isDepositButtonDisabled = isProcessing || hasErrors || !cvvValue;

  return (
    <Flex spacing="lg" justify="space-between" direction="vertical">
      <Flex.Block>
        <Flex spacing="md" justify="space-between">
          <Flex.Block>
            <TrackClick
              eventName={
                EVENTS.MIXPANEL_QUICK_DEPOSIT_PRE_DEFINED_AMOUNT_ADJUSTED
              }
            >
              <TextInput
                data-test-id="deposit-amount-selector"
                prefix={currencySymbol}
                type="number"
                inputMode="numeric"
                value={depositValue.toString()}
                onChange={onAmountChange}
                className="u-font-lg u-font-weight-bold"
                inputClassName="u-font-lg u-font-weight-bold"
                helperText={formErrors.amountInput || deposit_helper_text}
                variant={formErrors.amountInput ? "invalid" : "valid"}
              />
            </TrackClick>
          </Flex.Block>
          <Flex.Item className="c-quick-deposit-slip__cvv">
            <Flex direction="vertical" spacing="sm">
              <Flex.Item>
                <CvvCodeIframe
                  onValidation={onCvvError}
                  onSuccess={onCvvSuccess}
                />
              </Flex.Item>
              <Flex.Item className="u-margin-top--none">
                <Text
                  tag="span"
                  size="sm"
                  className={classNames(
                    formErrors.cvv ? "text-red-30" : "text-grey-50"
                  )}
                >
                  {formErrors.cvv || cvv_helper_text}
                </Text>
              </Flex.Item>
            </Flex>
          </Flex.Item>
        </Flex>
      </Flex.Block>
      <Flex.Block className="u-width--full">
        <Flex spacing="md" justify="space-between" align="center">
          <Flex.Item>
            {PaymentMethodComponent && PaymentMethodComponent()}
          </Flex.Item>
          <Flex.Item>
            <TrackClick
              eventName={
                isDepositButtonDisabled
                  ? EVENTS.MIXPANEL_QUICK_DEPOSIT_DISABLED_BUTTON_CLICKED
                  : EVENTS.MIXPANEL_QUICK_DEPOSIT_ENABLED_BUTTON_CLICKED
              }
            >
              <ButtonPrimary
                size="md"
                onClick={onDepositClick}
                isDisabled={isDepositButtonDisabled}
                isLoading={isProcessing}
              >
                {deposit_cta_text}
              </ButtonPrimary>
            </TrackClick>
          </Flex.Item>
        </Flex>
      </Flex.Block>
    </Flex>
  );
};
