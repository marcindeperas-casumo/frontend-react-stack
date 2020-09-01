// @flow
import * as React from "react";
import * as R from "ramda";
import classnames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import TextInput from "@casumo/cmp-text-input";
import { ButtonPrimary } from "@casumo/cmp-button";
import logger from "Services/logger";
import { interpolate } from "Utils";
import { PIQ, type CvvValidationEvent } from "Models/payments";

import "./QuickDepositSlip.scss";

type QuickDepositSlipFormErrors = {
  amountInput?: string,
  cvv?: string,
};

type Props = {
  t: {
    deposit_amount: string,
    deposit_cta_text: string,
    deposit_helper_text: string,
    cvv_helper_text: string,
    error_minimum_deposit: string,
    error_maximum_deposit: string,
  },
  currencySymbol: string,
  minAmount: number,
  maxAmount: number,
  presetAmount?: number,
  onDeposit: () => void,
  paymentMethodDetails?: () => React.Node,
};

export const QuickDepositSlip = ({
  t,
  currencySymbol,
  minAmount,
  maxAmount,
  presetAmount,
  onDeposit,
  paymentMethodDetails: PaymentMethodComponent,
}: Props) => {
  const piqErrorCodes = PIQ.encryptedIframe.errorCodeToVoca;
  const presetValue = presetAmount
    ? R.clamp(minAmount, maxAmount, presetAmount)
    : minAmount;

  const [depositValue, setDepositValue] = React.useState(presetValue);
  const [cvvError, setCvvError] = React.useState();
  const [
    formErrors,
    setFormErrors,
  ] = React.useState<QuickDepositSlipFormErrors>({});

  const onAmountChange = React.useCallback(e => {
    const { value } = e.currentTarget;

    if (!isNaN(value)) {
      setDepositValue(value);
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const onCvvValidate = (e: CvvValidationEvent) => {
    // eslint-disable-next-line no-switch-statements/no-switch
    switch (e.status) {
      case "error":
        if (!e.errorType) {
          return;
        }

        const errorVoca = piqErrorCodes[e.errorType];

        if (!errorVoca) {
          logger.error(`Unknown error code from PIQ iframe: ${e.errorType}`);
        } else {
          setCvvError(errorVoca);
        }

        break;
      case "success":
        // todo: pass data to deposit callback
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setFormErrors({});

    if (depositValue < minAmount) {
      setFormErrors(
        (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
          R.merge(errors, {
            amountInput: interpolate(t.error_minimum_deposit, {
              amount: `${currencySymbol}${minAmount}`,
            }),
          })
      );
    }

    if (depositValue > maxAmount) {
      setFormErrors(
        (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
          R.merge(errors, {
            amountInput: interpolate(t.error_maximum_deposit, {
              amount: `${currencySymbol}${maxAmount}`,
            }),
          })
      );
    }

    if (cvvError) {
      setFormErrors(
        (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
          R.merge(errors, {
            cvv: cvvError,
          })
      );
    }
  }, [
    currencySymbol,
    cvvError,
    depositValue,
    maxAmount,
    minAmount,
    t.error_maximum_deposit,
    t.error_minimum_deposit,
  ]);

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
              helperText={formErrors.amountInput || t.deposit_helper_text}
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
                {/** todo: replace below TextInput with PIQ CVV iframe */}
                <TextInput
                  onChange={() =>
                    console.warn("This is just a placeholder for PIQ iframe")
                  }
                  value="111"
                  className="u-font-lg u-font-weight-bold"
                  inputClassName="u-font-lg u-font-weight-bold"
                  placeholder="CVV"
                />
              </Flex.Item>
              <Flex.Item>
                <Text
                  tag="span"
                  size="sm"
                  className={classnames(
                    formErrors.cvv ? "t-color-red-30" : "t-color-grey-50"
                  )}
                >
                  {formErrors.cvv || t.cvv_helper_text}
                </Text>
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item className="u-width--full">
            <ButtonPrimary
              size="md"
              onClick={onDeposit}
              isDisabled={!R.isEmpty(formErrors)}
            >
              {t.deposit_cta_text}
            </ButtonPrimary>
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};
