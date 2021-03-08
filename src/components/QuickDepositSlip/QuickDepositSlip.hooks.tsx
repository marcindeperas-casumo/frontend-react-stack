import * as React from "react";
import * as R from "ramda";
import logger from "Services/logger";
import { interpolate } from "Utils";
import type { CvvValidationEvent } from "Models/payments";
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

const cvvErrors = R.pickBy((v, k) => !R.isEmpty(R.match(/error_cvv/, k)));

/* eslint-disable sonarjs/cognitive-complexity */
export const useQuickDepositSlipForm = ({
  minAmount,
  maxAmount,
  presetAmount,
  translations: t,
}: QuickDepositSlipFormProps) => {
  const {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'error_deposit_minimum' does not exist on... Remove this comment to see the full error message
    error_deposit_minimum,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'error_deposit_maximum' does not exist on... Remove this comment to see the full error message
    error_deposit_maximum,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'error_deposit_amount_required' does not ... Remove this comment to see the full error message
    error_deposit_amount_required,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'QuickDepositSlipFormErrorTransla... Remove this comment to see the full error message
  } = R.map(v => v || "")(t);

  const cvvErrorTranslationKeys = CVV_TRANSLATIONS_MAP(cvvErrors(t));
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!isNaN(value)) {
        setDepositValue(parseInt(value));
      }
    },
    []
  );

  const onCvvIframeCallback = (e: CvvValidationEvent) => {
    if (e.status === "error" && !e.errorType) {
      return;
    }

    if (e.status === "error" && e.errorType) {
      const validErrorKey = cvvErrorTranslationKeys[e.errorType];

      if (!validErrorKey) {
        logger.error(`Unknown error code from PIQ iframe: ${e.errorType}`);
        return;
      }

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setCvvError(e.errorType);
      setCvvValue(null);
    }

    if (e.status === "success") {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setCvvValue(e.data);
      setCvvError(null);
    }
  };

  React.useEffect(
    () => {
      setFormErrors({});

      if (!depositValue) {
        setFormErrors(
          R.mergeLeft({
            amountInput: error_deposit_amount_required,
          })
        );
      }

      if (depositValue < minAmount) {
        setFormErrors(
          R.mergeLeft({
            amountInput: interpolate(error_deposit_minimum, {
              amount: `${minAmount}`,
            }),
          })
        );
      }

      if (depositValue > maxAmount) {
        setFormErrors(
          R.mergeLeft({
            amountInput: interpolate(error_deposit_maximum, {
              amount: `${maxAmount}`,
            }),
          })
        );
      }

      if (cvvError) {
        setFormErrors(
          R.mergeLeft({
            // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
            cvv: cvvErrorTranslationKeys[cvvError],
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cvvError, depositValue, maxAmount, minAmount]
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
