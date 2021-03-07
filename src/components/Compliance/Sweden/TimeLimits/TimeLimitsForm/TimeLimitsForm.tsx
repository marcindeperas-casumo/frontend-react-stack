// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
// @ts-expect-error ts-migrate(2724) FIXME: '"../../../../../models/playOkay"' has no exported... Remove this comment to see the full error message
import { type LoginTimeLimitsFormData } from "Models/playOkay";
import { useTimeLimitsFormState } from "./useTimeLimitsFormState";
import { TimeLimitsFormRow } from "./TimeLimitsFormRow";

type Props = {
  t: {
    form_cta: ?string,
    form_hrs_per_day: ?string,
    form_hrs_per_week: ?string,
    form_hrs_per_month: ?string,
    form_placeholder_enter_amount: ?string,
  },
  onClickCta: (limits: LoginTimeLimitsFormData) => void,
  isFetching: boolean,
};

export function TimeLimitsForm({ t, onClickCta, isFetching }: Props) {
  const {
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
  } = useTimeLimitsFormState();

  return (
    <Flex
      direction="vertical"
      align="stretch"
      spacing="md"
      className="u-padding--md u-padding--lg@desktop u-padding--lg@tablet"
    >
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ value: numbe... Remove this comment to see the full error message */}
      <TimeLimitsFormRow
        value={hrsPerDay}
        min={minHrsPerDay}
        max={maxHrsPerDay}
        setter={setHrsPerDay}
        errorMessage={dailyLimitErrorMessage}
        t={{ ...t, hrs_per_period: t.form_hrs_per_day }}
      />
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ value: numbe... Remove this comment to see the full error message */}
      <TimeLimitsFormRow
        value={hrsPerWeek}
        min={minHrsPerWeek}
        max={maxHrsPerWeek}
        setter={setHrsPerWeek}
        errorMessage={weeklyLimitErrorMessage}
        t={{ ...t, hrs_per_period: t.form_hrs_per_week }}
      />
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ value: numbe... Remove this comment to see the full error message */}
      <TimeLimitsFormRow
        value={hrsPerMonth}
        min={minHrsPerMonth}
        max={maxHrsPerMonth}
        setter={setHrsPerMonth}
        errorMessage={monthlyLimitErrorMessage}
        t={{ ...t, hrs_per_period: t.form_hrs_per_month }}
      />
      <Flex.Item>
        <ButtonPrimary
          isLoading={isFetching}
          isDisabled={Boolean(
            !anyLimitChanged ||
              dailyLimitErrorMessage ||
              weeklyLimitErrorMessage ||
              monthlyLimitErrorMessage
          )}
          className="u-width--full u-margin-top--md u-margin-top--3xlg@desktop"
          size="md"
          onClick={() => onClickCta({ hrsPerDay, hrsPerWeek, hrsPerMonth })}
        >
          {t.form_cta || ""}
        </ButtonPrimary>
      </Flex.Item>
    </Flex>
  );
}
