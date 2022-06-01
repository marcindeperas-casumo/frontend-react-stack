import * as React from "react";
import { useStateValidator } from "react-use";
import {
  TLimitGroupFormData,
  TPlayOkaySettingsTranslations,
  TValidateLimitsProps,
  validateLimits,
} from "Models/playOkay";
import { TLimitGroupConfig } from "Models/playOkay/config/config.types";
import { TCurrencyCode } from "Src/constants";
import { localStateReducer } from "./LimitsForm.utils";
import { LimitsForm } from "./LimitsForm";
import { TValidatorResponse } from "./LimitsForm.types";

export type TProps = {
  t?: TPlayOkaySettingsTranslations;
  onClickCta: (limits: TLimitGroupFormData) => void;
  isFetching: boolean;
  savingFailed: boolean;
  currency: TCurrencyCode;
  limitsInGroup: TLimitGroupFormData | null;
  limitGroupConfig: TLimitGroupConfig;
};

export function LimitsFormLocalContainer({
  t,
  onClickCta,
  isFetching,
  savingFailed,
  currency,
  limitsInGroup,
  limitGroupConfig,
}: TProps) {
  const [newLimitsInGroup, dispatch] = React.useReducer<
    typeof localStateReducer
  >(localStateReducer, limitsInGroup);
  const anyLimitChanged = newLimitsInGroup?.reduce(
    (accu, limit) => accu || limit?.hasChanged,
    false
  );
  const validator = (props: TValidateLimitsProps): TValidatorResponse => {
    const result = validateLimits(props);

    return [result === "valid", result];
  };
  const validatorInput = React.useMemo(
    () => ({
      currentLimits: limitsInGroup,
      newLimits: newLimitsInGroup,
      config: limitGroupConfig,
    }),
    [newLimitsInGroup, limitsInGroup, limitGroupConfig]
  );
  const [[isValid, validatorResponse]] = useStateValidator<
    TValidatorResponse,
    TValidateLimitsProps
  >(validatorInput, validator);
  const hasPeriodSpecificErrors = Array.isArray(validatorResponse);
  const allowMultiplePeriods =
    limitGroupConfig.allowMany ||
    limitGroupConfig.group === "time/LoginTimeBlock";

  return (
    <LimitsForm
      t={t}
      isSaving={isFetching}
      savingDisabled={!isValid || !anyLimitChanged}
      isValid={isValid}
      validatorResponse={validatorResponse}
      savingFailed={savingFailed}
      allowMultiplePeriods={allowMultiplePeriods}
      hasPeriodSpecificErrors={hasPeriodSpecificErrors}
      limitGroupConfig={limitGroupConfig}
      limitsInGroup={limitsInGroup}
      newLimitsInGroup={newLimitsInGroup}
      dispatch={dispatch}
      currency={currency}
      onClickCta={() => onClickCta(newLimitsInGroup)}
    />
  );
}
