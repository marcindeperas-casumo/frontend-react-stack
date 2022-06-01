import { TPeriod } from "../playOkay.types";
import { validateLimits } from "./validateLimits";

export type TValidateMandatoryPeriod = `${Lowercase<TPeriod>}_required`;
export type TValidateMandatoryPeriodResult = Array<TValidateMandatoryPeriod>;
export type TValidateMandatoryResult =
  | "valid"
  | "all_required"
  | "anyone_required"
  | "anytwo_required"
  | TValidateMandatoryPeriodResult;

export type TValidateMinMaxPeriodResult =
  | `${Lowercase<TPeriod>}_too_low`
  | `${Lowercase<TPeriod>}_too_high`;
export type TValidateMinMaxResult = Array<TValidateMinMaxPeriodResult>;

export type TValidateLimitsResponse =
  | TValidateMandatoryResult
  | TValidateMinMaxResult;

export type TValidateLimitsProps = Parameters<typeof validateLimits>[0];
