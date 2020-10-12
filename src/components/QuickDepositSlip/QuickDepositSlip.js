// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import TextInput from "@casumo/cmp-text-input";
import classNames from "classnames";
import { ButtonPrimary } from "@casumo/cmp-button";
import { CvvCodeIframe } from "Components/Payments";
import { useQuickDepositSlipForm } from "./QuickDepositSlip.hooks";
import { type QuickDepositSlipProps } from "./QuickDepositSlip.types";

import "./QuickDepositSlip.scss";

const errorTranslations = R.pickBy((v, k) => !R.isEmpty(R.match(/error_/, k)));

export const QuickDepositSlip = ({
  currencySymbol,
  minAmount,
  maxAmount,
  presetAmount,
  onDeposit,
  renderPaymentMethodDetails: PaymentMethodComponent,
  translations: t,
}: QuickDepositSlipProps) => {
  const { deposit_cta_text, cvv_helper_text, deposit_helper_text } = R.map(
    v => v || ""
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

  return (
    <Flex spacing="lg" justify="space-between">
      <Flex.Block>
        <Flex
          spacing="md"
          justify="space-between"
          align="center"
          direction="vertical"
        >
          <Flex.Block className="u-width--full">
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
          </Flex.Block>
          <Flex.Block className="u-width--full">
            {PaymentMethodComponent && PaymentMethodComponent()}
          </Flex.Block>
        </Flex>
      </Flex.Block>
      <Flex.Item>
        <Flex
          spacing="md"
          justify="space-between"
          align="center"
          direction="vertical"
        >
          <Flex.Item className="c-quick-deposit-slip__cvv">
            <Flex direction="vertical" spacing="sm" justify="space-between">
              <Flex.Item>
                <CvvCodeIframe
                  onValidation={onCvvError}
                  onSuccess={onCvvSuccess}
                />
              </Flex.Item>
              <Flex.Item>
                <Text
                  tag="span"
                  size="sm"
                  className={classNames(
                    formErrors.cvv ? "t-color-red-30" : "t-color-grey-50"
                  )}
                >
                  {formErrors.cvv || cvv_helper_text}
                </Text>
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item className="u-width--full">
            <ButtonPrimary
              size="md"
              onClick={onDepositClick}
              isDisabled={!R.isEmpty(formErrors)}
            >
              {deposit_cta_text}
            </ButtonPrimary>
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};
