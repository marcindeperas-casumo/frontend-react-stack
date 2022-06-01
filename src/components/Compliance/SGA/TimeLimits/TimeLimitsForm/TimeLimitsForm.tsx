import cx from "classnames";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import type { TLoginTimeLimit } from "Models/playOkay";
import { useTimeLimitsFormState } from "./useTimeLimitsFormState";
import { TimeLimitsFormRow } from "./TimeLimitsFormRow";

export type TLoginTimeLimitsFormData = {
  hrsPerDay: number;
  hrsPerDayChanged: boolean;
  hrsPerWeek: number;
  hrsPerWeekChanged: boolean;
  hrsPerMonth: number;
  hrsPerMonthChanged: boolean;
};

type Props = {
  t: {
    form_cta: string | undefined;
    form_hrs_per_day: string | undefined;
    form_hrs_per_week: string | undefined;
    form_hrs_per_month: string | undefined;
    form_placeholder_enter_amount: string | undefined;
  };
  onClickCta: (limits: TLoginTimeLimitsFormData) => void;
  isFetching: boolean;
  currentLoginTimeLimits: Array<TLoginTimeLimit>;
};

export function TimeLimitsForm({
  t,
  onClickCta,
  isFetching,
  currentLoginTimeLimits,
}: Props) {
  const {
    hrsPerDay,
    hrsPerDayChanged,
    hrsPerWeek,
    hrsPerWeekChanged,
    hrsPerMonth,
    hrsPerMonthChanged,
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
  } = useTimeLimitsFormState({
    currentLoginTimeLimits,
  });

  return (
    <div
      className={cx("flex flex-col gap-md items-stretch", "p-md tablet:p-lg")}
    >
      <TimeLimitsFormRow
        value={hrsPerDay}
        min={minHrsPerDay}
        max={maxHrsPerDay}
        setter={setHrsPerDay}
        errorMessage={dailyLimitErrorMessage}
        t={{ ...t, hrs_per_period: t.form_hrs_per_day }}
      />
      <TimeLimitsFormRow
        value={hrsPerWeek}
        min={minHrsPerWeek}
        max={maxHrsPerWeek}
        setter={setHrsPerWeek}
        errorMessage={weeklyLimitErrorMessage}
        t={{ ...t, hrs_per_period: t.form_hrs_per_week }}
      />
      <TimeLimitsFormRow
        value={hrsPerMonth}
        min={minHrsPerMonth}
        max={maxHrsPerMonth}
        setter={setHrsPerMonth}
        errorMessage={monthlyLimitErrorMessage}
        t={{ ...t, hrs_per_period: t.form_hrs_per_month }}
      />
      <ButtonPrimary
        isLoading={isFetching}
        isDisabled={Boolean(
          !anyLimitChanged ||
            dailyLimitErrorMessage ||
            weeklyLimitErrorMessage ||
            monthlyLimitErrorMessage
        )}
        className="w-full mt-md desktop:mt-3xlg"
        size="md"
        onClick={() =>
          onClickCta({
            hrsPerDay,
            hrsPerDayChanged,
            hrsPerWeek,
            hrsPerWeekChanged,
            hrsPerMonth,
            hrsPerMonthChanged,
          })
        }
      >
        {t.form_cta || ""}
      </ButtonPrimary>
    </div>
  );
}
