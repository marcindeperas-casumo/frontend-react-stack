import {
  TLimitGroupFormData,
  TPeriod,
  TPlayOkaySettingsTranslations,
  TValidateLimitsResponse,
} from "Models/playOkay";
import {
  TLimitGroup,
  TLimitGroupConfig,
} from "Models/playOkay/config/config.types";
import { TCurrencyCode } from "Src/constants";

export type TLimitsFormReducerAction = {
  type: "update";
  payload: Array<{
    value: number;
    period: TPeriod;
    currentValue: number | null;
  }>;
};

export type TGetTranslationForValidatorResponseArgs = {
  validatorResponse: TValidateLimitsResponse;
  period?: TPeriod;
};

export type TTransformFormDataToRequestPayloadsArgs = {
  formData: TLimitGroupFormData;
  currency: TCurrencyCode;
  limitGroup: TLimitGroup;
};

export type TPrepareRequestPayloadArgs = {
  limitGroup: TLimitGroup;
  currency: TCurrencyCode;
  value: number | null;
  hasChanged?: boolean;
  period: TPeriod;
};

export type TValidatorResponse = [boolean, TValidateLimitsResponse];

export type TLimitsFormProps = {
  t?: TPlayOkaySettingsTranslations;
  onClickCta: () => void;
  allowMultiplePeriods?: boolean;
  hasPeriodSpecificErrors?: boolean;
  dispatch: React.Dispatch<TLimitsFormReducerAction>;
  isSaving?: boolean;
  isValid: boolean;
  validatorResponse: TValidateLimitsResponse;
  savingFailed?: boolean;
  savingDisabled?: boolean;
  currency: TCurrencyCode;
  limitsInGroup: TLimitGroupFormData | null;
  newLimitsInGroup: TLimitGroupFormData | null;
  limitGroupConfig: TLimitGroupConfig;
};
