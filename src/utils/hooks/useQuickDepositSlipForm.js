// @flow
import * as React from "react";
import * as R from "ramda";
import logger from "Services/logger";
import { interpolate } from "Utils";
import { type CvvValidationEvent } from "Models/payments";

type QuickDepositSlipFormProps = {
  minAmount: number,
  maxAmount: number,
  presetAmount?: number,
  error_deposit_minimum: string,
  error_deposit_maximum: string,
  error_cvv_required: string,
  error_cvv_too_short: string,
  error_cvv_not_integer: string,
};

type QuickDepositSlipFormErrors = {
  amountInput?: string,
  cvv?: string,
};

const CVV_TRANSLATIONS_MAP = ({
  error_cvv_required,
  error_cvv_too_short,
  error_cvv_not_integer,
}) => ({
  REQUIRED: error_cvv_required,
  TOO_SHORT: error_cvv_too_short,
  NOT_INTEGER: error_cvv_not_integer,
});

/* eslint-disable sonarjs/cognitive-complexity */
export const useQuickDepositSlipForm = ({
  minAmount,
  maxAmount,
  presetAmount,
  error_deposit_minimum,
  error_deposit_maximum,
  error_cvv_required,
  error_cvv_too_short,
  error_cvv_not_integer,
}: QuickDepositSlipFormProps) => {
  const cvvErrorTranslationKeys = CVV_TRANSLATIONS_MAP({
    error_cvv_required,
    error_cvv_too_short,
    error_cvv_not_integer,
  });
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

        const validErrorKey = cvvErrorTranslationKeys[e.errorType];

        if (!validErrorKey) {
          // $FlowFixMe
          logger.error(`Unknown error code from PIQ iframe: ${e.errorType}`);
        } else {
          setCvvError(e.errorType);
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
            amountInput: interpolate(error_deposit_minimum, {
              amount: `${minAmount}`,
            }),
          })
      );
    }

    if (depositValue > maxAmount) {
      setFormErrors(
        (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
          R.merge(errors, {
            amountInput: interpolate(error_deposit_maximum, {
              amount: `${maxAmount}`,
            }),
          })
      );
    }

    if (cvvError) {
      setFormErrors(
        (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
          R.merge(errors, {
            cvv: CVV_TRANSLATIONS_MAP({
              error_cvv_required,
              error_cvv_too_short,
              error_cvv_not_integer,
            })[cvvError],
          })
      );
    }
  }, [
    cvvError,
    depositValue,
    error_cvv_not_integer,
    error_cvv_required,
    error_cvv_too_short,
    error_deposit_maximum,
    error_deposit_minimum,
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
