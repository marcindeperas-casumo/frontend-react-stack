import * as React from "react";
import { useSelector } from "react-redux";
import { Duration } from "luxon";
import type { LoginTimeLimit } from "Models/playOkay";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix,
} from "Models/playOkay";
import { interpolate } from "Utils";
import { useTranslationsGql } from "Utils/hooks";

const DEFAULT = {
  minHrsPerDay: 1,
  maxHrsPerDay: 23,
  minHrsPerWeek: 1,
  maxHrsPerWeek: 167,
  minHrsPerMonth: 1,
  maxHrsPerMonth: 671,
};

export type UseTimeLimitsFormStateType = {
  hrsPerDay: number;
  hrsPerWeek: number;
  hrsPerMonth: number;
  minHrsPerDay: number;
  minHrsPerWeek: number;
  minHrsPerMonth: number;
  maxHrsPerDay: number;
  maxHrsPerWeek: number;
  maxHrsPerMonth: number;
  setHrsPerDay: (n: number) => void;
  setHrsPerWeek: (n: number) => void;
  setHrsPerMonth: (n: number) => void;
  dailyLimitErrorMessage: string;
  weeklyLimitErrorMessage: string;
  monthlyLimitErrorMessage: string;
  anyLimitChanged: boolean;
};

export function useTimeLimitsFormState(): UseTimeLimitsFormStateType {
  const { t } = useTranslationsGql({
    form_value_too_low: `${cmsKeyPrefix}form_value_too_low`,
    form_value_too_high: `${cmsKeyPrefix}form_value_too_high`,
  });
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
  const savedHrsPerDay = isoLimitAsHours(dailyLimit);
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
  const savedHrsPerWeek = isoLimitAsHours(weeklyLimit);
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
  const savedHrsPerMonth = isoLimitAsHours(monthlyLimit);

  const [hrsPerDay, setHrsPerDay] = React.useState<number>(savedHrsPerDay);
  const [hrsPerWeek, setHrsPerWeek] = React.useState<number>(savedHrsPerWeek);
  const [hrsPerMonth, setHrsPerMonth] = React.useState<number>(
    savedHrsPerMonth
  );

  const [minHrsPerDay] = React.useState<number>(DEFAULT.minHrsPerDay);
  const [maxHrsPerDay, setMaxHrsPerDay] = React.useState<number>(
    hrsPerWeek || DEFAULT.maxHrsPerDay
  );
  const [minHrsPerWeek, setMinHrsPerWeek] = React.useState<number>(
    hrsPerDay || DEFAULT.minHrsPerWeek
  );
  const [maxHrsPerWeek, setMaxHrsPerWeek] = React.useState<number>(
    hrsPerMonth || DEFAULT.maxHrsPerWeek
  );
  const [minHrsPerMonth, setMinHrsPerMonth] = React.useState<number>(
    hrsPerWeek || DEFAULT.minHrsPerMonth
  );
  const [maxHrsPerMonth] = React.useState<number>(DEFAULT.maxHrsPerMonth);

  const dailyLimitErrorMessage = limitErrorMessage(
    minHrsPerDay,
    maxHrsPerDay,
    hrsPerDay,
    t
  );
  const weeklyLimitErrorMessage = limitErrorMessage(
    minHrsPerWeek,
    maxHrsPerWeek,
    hrsPerWeek,
    t
  );
  const monthlyLimitErrorMessage = limitErrorMessage(
    minHrsPerMonth,
    maxHrsPerMonth,
    hrsPerMonth,
    t
  );
  const anyLimitChanged =
    hrsPerDay !== savedHrsPerDay ||
    hrsPerWeek !== savedHrsPerWeek ||
    hrsPerMonth !== savedHrsPerMonth;

  React.useEffect(() => {
    if (hrsPerDay > 0) {
      setMinHrsPerWeek(Math.max(DEFAULT.minHrsPerWeek, hrsPerDay));
      setMinHrsPerMonth(Math.max(DEFAULT.minHrsPerMonth, hrsPerDay));
    }
  }, [hrsPerDay]);

  React.useEffect(() => {
    if (hrsPerWeek > 0) {
      setMaxHrsPerDay(Math.min(DEFAULT.maxHrsPerDay, hrsPerWeek));
      setMinHrsPerMonth(Math.max(DEFAULT.minHrsPerMonth, hrsPerWeek));
    }
  }, [hrsPerWeek]);

  React.useEffect(() => {
    if (hrsPerMonth > 0) {
      setMaxHrsPerWeek(Math.min(DEFAULT.maxHrsPerWeek, hrsPerMonth));
    }
  }, [hrsPerMonth]);

  return {
    hrsPerDay,
    hrsPerWeek,
    hrsPerMonth,
    minHrsPerDay,
    minHrsPerWeek,
    minHrsPerMonth,
    maxHrsPerDay,
    maxHrsPerWeek,
    maxHrsPerMonth,
    setHrsPerDay,
    setHrsPerWeek,
    setHrsPerMonth,
    dailyLimitErrorMessage,
    weeklyLimitErrorMessage,
    monthlyLimitErrorMessage,
    anyLimitChanged,
  };
}

export function limitErrorMessage(
  minValue: number,
  maxValue: number,
  newValue: number,
  t: {
    form_value_too_low: string | undefined;
    form_value_too_high: string | undefined;
  }
): string {
  if (newValue < minValue) {
    return interpolate(t.form_value_too_low || "", { minValue });
  }
  if (newValue > maxValue) {
    return interpolate(t.form_value_too_high || "", { maxValue });
  }

  return "";
}

function isoLimitAsHours(limit: LoginTimeLimit | undefined) {
  return limit ? Duration.fromISO(limit.limit).as("hours") : 0;
}
