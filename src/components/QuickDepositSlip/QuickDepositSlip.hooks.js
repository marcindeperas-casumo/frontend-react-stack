// @flow
import * as React from "react";
import * as R from "ramda";
import logger from "Services/logger";
import { interpolate } from "Utils";
import { type CvvValidationEvent } from "Models/payments";
import type {
  QuickDepositSlipFormProps,
  QuickDepositSlipFormErrors,
} from "./QuickDepositSlip.types";

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
  translations: t,
}: QuickDepositSlipFormProps) => {
  const cvvErrorTranslationKeys = CVV_TRANSLATIONS_MAP(
    R.pick(
      ["error_cvv_required", "error_cvv_too_short", "error_cvv_not_integer"],
      t
    )
  );
  const presetValue = presetAmount
    ? R.clamp(minAmount, maxAmount, presetAmount)
    : minAmount;

  const [depositValue, setDepositValue] = React.useState<number>(presetValue);
  const [cvvError, setCvvError] = React.useState();
  const [cvvValue, setCvvValue] = React.useState();
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

  const onCvvIframeCallback = (e: CvvValidationEvent) => {
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

        setCvvValue(null);
        break;
      case "success":
        setCvvValue(e.data);
        setCvvError(null);
        break;
      default:
        break;
    }
  };

  React.useEffect(
    () => {
      setFormErrors({});
      if (!depositValue) {
        setFormErrors(
          (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
            R.merge(errors, {
              amountInput: t.error_deposit_amount_required,
            })
        );
      }

      if (depositValue < minAmount) {
        setFormErrors(
          (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
            R.merge(errors, {
              amountInput: interpolate(t.error_deposit_minimum, {
                amount: `${minAmount}`,
              }),
            })
        );
      }

      if (depositValue > maxAmount) {
        setFormErrors(
          (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
            R.merge(errors, {
              amountInput: interpolate(t.error_deposit_maximum, {
                amount: `${maxAmount}`,
              }),
            })
        );
      }

      if (cvvError) {
        setFormErrors(
          (errors: QuickDepositSlipFormErrors): QuickDepositSlipFormErrors =>
            R.merge(errors, {
              cvv: cvvErrorTranslationKeys[cvvError],
            })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, cvvError, depositValue, maxAmount, minAmount]
  );

  return {
    depositValue,
    cvvValue,
    formErrors,
    onAmountChange,
    onCvvIframeCallback,
  };
};
/* eslint-enable sonarjs/cognitive-complexity */
