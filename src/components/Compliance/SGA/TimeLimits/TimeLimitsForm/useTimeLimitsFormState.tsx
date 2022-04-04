import * as React from "react";
import * as _ from "lodash";
import { Duration } from "luxon";
import type { TLoginTimeLimit } from "Models/playOkay";
import { loginTimeLimitsCmsSlug } from "Models/playOkay";
import { interpolate } from "Utils";
import { useTranslations } from "Utils/hooks";

const DEFAULT = {
  minHrsPerDay: 1,
  maxHrsPerDay: 23,
  minHrsPerWeek: 1,
  maxHrsPerWeek: 167,
  minHrsPerMonth: 1,
  maxHrsPerMonth: 671,
};

type Props = {
  currentLoginTimeLimits: Array<TLoginTimeLimit>;
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
  hrsPerDayChanged: boolean;
  hrsPerWeekChanged: boolean;
  hrsPerMonthChanged: boolean;
};

export function useTimeLimitsFormState({
  currentLoginTimeLimits,
}: Props): UseTimeLimitsFormStateType {
  const t = useTranslations<{
    form_value_too_low: string;
    form_value_too_high: string;
  }>(loginTimeLimitsCmsSlug);

  const savedHrsPerDay = isoLimitAsHours(
    currentLoginTimeLimits.find(limit => limit.period === "Daily")
  );
  const savedHrsPerWeek = isoLimitAsHours(
    currentLoginTimeLimits.find(limit => limit.period === "Weekly")
  );
  const savedHrsPerMonth = isoLimitAsHours(
    currentLoginTimeLimits.find(limit => limit.period === "Monthly")
  );

  const [hrsPerDay, setHrsPerDay] = React.useState<number | null>(
    savedHrsPerDay
  );
  const [hrsPerWeek, setHrsPerWeek] = React.useState<number | null>(
    savedHrsPerWeek
  );
  const [hrsPerMonth, setHrsPerMonth] = React.useState<number | null>(
    savedHrsPerMonth
  );

  const [minHrsPerDay, setMinHrsPerDay] = React.useState<number>(
    DEFAULT.minHrsPerDay
  );
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
  const hrsPerDayChanged = hrsPerDay !== savedHrsPerDay;
  const hrsPerWeekChanged = hrsPerWeek !== savedHrsPerWeek;
  const hrsPerMonthChanged = hrsPerMonth !== savedHrsPerMonth;
  const anyLimitChanged =
    hrsPerDayChanged || hrsPerWeekChanged || hrsPerMonthChanged;

  React.useEffect(() => {
    setMinHrsPerDay(hrsPerDay === null ? 0 : DEFAULT.minHrsPerDay);
    setMaxHrsPerDay(
      _.min(
        [
          DEFAULT.maxHrsPerDay,
          hrsPerWeek,
          hrsPerMonth,
          savedHrsPerWeek,
          savedHrsPerMonth,
        ].filter(Boolean)
      )
    );

    setMinHrsPerWeek(
      hrsPerWeek === null
        ? 0
        : _.max([DEFAULT.minHrsPerWeek, hrsPerDay].filter(Boolean))
    );
    setMaxHrsPerWeek(
      _.min(
        [DEFAULT.maxHrsPerWeek, hrsPerMonth, savedHrsPerMonth].filter(Boolean)
      )
    );

    setMinHrsPerMonth(
      hrsPerMonth === null
        ? 0
        : _.max([DEFAULT.minHrsPerMonth, hrsPerDay, hrsPerWeek].filter(Boolean))
    );
  }, [hrsPerDay, hrsPerWeek, hrsPerMonth, savedHrsPerWeek, savedHrsPerMonth]);

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
    hrsPerDayChanged,
    hrsPerWeekChanged,
    hrsPerMonthChanged,
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
    return interpolate(t?.form_value_too_low || "", { minValue });
  }
  if (newValue > maxValue) {
    return interpolate(t?.form_value_too_high || "", { maxValue });
  }

  return "";
}

function isoLimitAsHours(limit: TLoginTimeLimit | undefined) {
  return limit ? Duration.fromISO(limit.limit).as("hours") : null;
}
