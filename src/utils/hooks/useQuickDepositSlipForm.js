// @flow
import * as React from "react";
import * as R from "ramda";
import logger from "Services/logger";
import { interpolate } from "Utils";
import { PIQ, type CvvValidationEvent } from "Models/payments";

type QuickDepositSlipFormProps = {
  minAmount: number,
  maxAmount: number,
  presetAmount?: number,
  error_minimum_deposit: string,
  error_maximum_deposit: string,
};

type QuickDepositSlipFormErrors = {
  amountInput?: string,
  cvv?: string,
};

/* eslint-disable sonarjs/cognitive-complexity */
export const useQuickDepositSlipForm = ({
  minAmount,
  maxAmount,
  presetAmount,
  error_minimum_deposit,
  error_maximum_deposit,
}: QuickDepositSlipFormProps) => {
  const piqErrorCodes = PIQ.encryptedIframe.errorCodeToVoca;
  const presetValue = presetAmount
    ? R.clamp(minAmount, maxAmount, presetAmount)
    : minAmount;

  const [depositValue, setDepositValue] = React.useState<number>(presetValue);
  const [cvvError, setCvvError] = React.useState();
  const [
    formErrors,
    setFormErrors,
  ] = React.useState<QuickDepositSlipFormErrors>({});

  const onAmountChange = React.useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      if (!isNaN(value)) {
        setDepositValue(parseInt(value));
      }
    },
    []
  );

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
            amountInput: interpolate(error_minimum_deposit, {
              amount: `${minAmount}`,
            }),
          })
      );
    }

    if (depositValue > maxAmount) {
      setFormErrors(
        (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
          R.merge(errors, {
            amountInput: interpolate(error_maximum_deposit, {
              amount: `${maxAmount}`,
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
    cvvError,
    depositValue,
    error_maximum_deposit,
    error_minimum_deposit,
    maxAmount,
    minAmount,
  ]);

  return {
    depositValue,
    formErrors,
    onAmountChange,
    onCvvValidate,
  };
};
/* eslint-enable sonarjs/cognitive-complexity */
