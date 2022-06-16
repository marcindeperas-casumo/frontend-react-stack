import * as R from "ramda";
import * as _ from "lodash";
import { TLimitGroupConfig } from "../config/config.types";
import { TLimitGroupFormData } from "./limits.api.query.types";
import {
  TValidateMandatoryPeriod,
  TValidateMandatoryPeriodResult,
  TValidateMandatoryResult,
  TValidateMinMaxPeriodResult,
  TValidateMinMaxResult,
} from "./limits.validator.types";

type Props = {
  currentLimits: TLimitGroupFormData;
  newLimits: TLimitGroupFormData;
  config: TLimitGroupConfig;
};

export function validateLimits(props: Props) {
  const validateMandatoryResult = validateMandatory(props);

  if (validateMandatoryResult !== "valid") {
    return validateMandatoryResult;
  }

  const validateLoginBlockResult = validateTimeLoginBlock(props);

  if (validateLoginBlockResult.length > 0) {
    return validateLoginBlockResult;
  }

  const validateMinMaxResult = validateMinMax(props);

  if (validateMinMaxResult.length > 0) {
    return validateMinMaxResult;
  }

  return "valid";
}

export function validateMandatory({
  newLimits,
  config,
}: Props): TValidateMandatoryResult {
  const newLimitsValues = R.pluck("value", newLimits);
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (config.mandatory) {
    case "none":
      return "valid";
    case "all":
      return newLimits.length === config.available.length &&
        newLimitsValues.every(notNilAndGteZero)
        ? "valid"
        : "all_required";
    case "anyone":
      return newLimitsValues.filter(notNilAndGteZero).length >= 1
        ? "valid"
        : "anyone_required";
    case "anytwo":
      return newLimitsValues.filter(notNilAndGteZero).length >= 2
        ? "valid"
        : "anytwo_required";
    default:
      // eslint-disable-next-line no-case-declarations
      const definedNewPeriods = newLimits
        .filter(({ value }) => notNilAndGteZero(value))
        .map(newLimit => newLimit.period);
      // eslint-disable-next-line no-case-declarations
      const notPresentPeriods = R.difference(
        config.mandatory,
        definedNewPeriods
      );

      return notPresentPeriods.length === 0
        ? "valid"
        : (notPresentPeriods.map(
            period => `${period.toLowerCase()}_required`
          ) as TValidateMandatoryPeriodResult);
  }
}

export function validateMinMax({
  currentLimits,
  newLimits,
  config,
}: Props): TValidateMinMaxResult {
  return config.available.reduce<TValidateMinMaxResult>(
    (accu, { min, max, period }, index) => {
      const shouldTakeIntoAccountCurrentLimits =
        config.group !== "time/LoginTimeBlock";
      const prevPeriodConfigs = config.available.slice(0, index);
      const nextPeriodConfigs = config.available.slice(index + 1);
      const prevNewLimits = prevPeriodConfigs.map(
        prevPeriodConfig =>
          newLimits.find(
            newLimit => newLimit.period === prevPeriodConfig.period
          )?.value
      );
      const nextNewLimits = nextPeriodConfigs.map(
        nextPeriodConfig =>
          newLimits.find(
            newLimit => newLimit.period === nextPeriodConfig.period
          )?.value
      );
      const prevCurrentLimits = prevPeriodConfigs.map(
        prevPeriodConfig =>
          currentLimits.find(limit => limit.period === prevPeriodConfig.period)
            ?.value
      );
      const nextCurrentLimits = nextPeriodConfigs.map(
        nextPeriodConfig =>
          currentLimits.find(limit => limit.period === nextPeriodConfig.period)
            ?.value
      );
      const thisLimit = newLimits.find(
        newLimit => newLimit.period === period
      )?.value;
      const thisLimitDefined = notNilAndGteZero(thisLimit);
      const thisLimitMin = _.max(
        [
          min,
          ...prevNewLimits,
          ...(shouldTakeIntoAccountCurrentLimits ? prevCurrentLimits : []),
        ].filter(notNilAndGteZero)
      );
      const thisLimitMax = _.min(
        [
          max,
          ...nextNewLimits,
          ...(shouldTakeIntoAccountCurrentLimits ? nextCurrentLimits : []),
        ].filter(notNilAndGteZero)
      );

      return [
        ...accu,
        thisLimitDefined && thisLimit > thisLimitMax
          ? (`${period.toLowerCase()}_too_high` as TValidateMinMaxPeriodResult)
          : null,
        thisLimitDefined && thisLimit < thisLimitMin
          ? (`${period.toLowerCase()}_too_low` as TValidateMinMaxPeriodResult)
          : null,
      ].filter(Boolean);
    },
    []
  );
}

export function validateTimeLoginBlock({
  newLimits,
  config,
}: Props): TValidateMandatoryPeriodResult {
  if (config.group !== "time/LoginTimeBlock") {
    return [];
  }

  const undefinedLimits = config.available.filter(
    availableLimit =>
      !newLimits.find(
        newLimit =>
          newLimit.period === availableLimit.period &&
          notNilAndGteZero(newLimit.value)
      )
  );

  if (
    undefinedLimits.length > 0 &&
    undefinedLimits.length < config.available.length
  ) {
    return undefinedLimits.map(
      limit =>
        `${limit.period.toLowerCase()}_required` as TValidateMandatoryPeriod
    );
  }

  return [];
}

const notNil = R.complement(R.isNil);
const gteZero = R.lte(0);
const notNilAndGteZero = R.allPass([notNil, gteZero]);
