// @flow
import * as R from "ramda";
import { formatCurrency, interpolate } from "Utils";
import type { DepositKinds } from "Models/playOkay/depositLimits";
import { limitTypes } from "Components/Compliance/DepositLimits";
import type {
  FormProps,
  Translations,
  LimitInputs,
} from "./DepositLimitsForm.types";

// eslint-disable-next-line sonarjs/cognitive-complexity
export function validate(
  currentLimit: DepositKinds,
  limitInputs: LimitInputs,
  formProps: FormProps,
  t: Translations
): ?string {
  const currentLimitNotEqual: DepositKinds => Boolean = R.complement(
    R.equals(currentLimit)
  );
  const currentLimitValue = limitInputs[currentLimit].value || 0;
  if (currentLimitNotEqual("daily")) {
    const i = limitTypes.indexOf(currentLimit) - 1;
    const previousLimitValue = limitInputs[limitTypes[i]].value || 0;
    if (previousLimitValue > currentLimitValue) {
      return interpolate(t.input_validation.cant_be_lower, {
        affectedLimitType: t[`${limitTypes[i]}_short`],
      });
    }
  }
  if (currentLimitNotEqual("monthly")) {
    const i = limitTypes.indexOf(currentLimit) + 1;
    const nextLimitValue = limitInputs[limitTypes[i]].value || 0;
    if (nextLimitValue < currentLimitValue) {
      return interpolate(t.input_validation.cant_be_higher, {
        affectedLimitType: t[`${limitTypes[i]}_short`],
      });
    }
  }
  if (currentLimitValue < 10) {
    return t.input_validation.lowest_limit;
  }
  if (currentLimitValue > 20000) {
    return t.input_validation.highest_limit;
  }

  const limitBeforeChange = formProps.limits[currentLimit] || 0;
  if (currentLimitValue > limitBeforeChange) {
    const replacements = {
      currentLimit: formatCurrency({
        locale: formProps.locale,
        currency: formProps.currency,
        value: limitBeforeChange,
      }),
    };

    if (formProps.increasesOrRevocationsBlocked) {
      return interpolate(
        t.input_validation.has_to_be_lower_while_not_risk_safe,
        replacements
      );
    }

    if (formProps.lock) {
      return interpolate(
        t.input_validation.has_to_be_lower_while_locked,
        replacements
      );
    }

    if (!formProps.responsibleGamblingTestCanBeTaken) {
      return interpolate(
        t.input_validation
          .has_to_be_lower_after_responsible_gambling_test_failed,
        replacements
      );
    }
  }

  if (formProps.pendingLimitChanges?.value) {
    const pendingChange =
      formProps.pendingLimitChanges?.value[currentLimit] || 0;
    if (currentLimitValue > pendingChange) {
      return interpolate(
        t.input_validation.has_to_be_lower_than_pending_adjustment,
        {
          pendingChange: formatCurrency({
            locale: formProps.locale,
            currency: formProps.currency,
            value: pendingChange,
          }),
        }
      );
    }
  }

  return null;
}
