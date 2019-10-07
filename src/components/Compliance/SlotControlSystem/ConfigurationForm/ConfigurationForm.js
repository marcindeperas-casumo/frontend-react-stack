// @flow
import * as React from "react";
import { map } from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { EditIcon, PlayIcon } from "@casumo/cmp-icons";
import { PillSelector } from "Components/PillSelector";
import { interpolate, formatCurrency, localiseTimeInterval } from "Utils";
import { LimitYourBudget } from "./LimitYourBudget/LimitYourBudget";
import "./ConfigurationForm.scss";

const { useState, useCallback } = React;
const SCREEN_TYPES = {
  FORM: "FORM",
  LIMIT_YOUR_BUDGET: "LIMIT_YOUR_BUDGET",
};
const LIMIT_YOUR_TIME_OPTS_2 = [15 * 60, 30 * 60, 60 * 60, 240 * 60];
const STATUS_ALERTS_EVERY_OPTS_2 = [5 * 60, 10 * 60, 15 * 60];
const WANT_BREAK_AFTER_OPTS = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
const WANT_BREAK_AFTER_YES_OPTS_2 = [60 * 60, 120 * 60, 240 * 60, 24 * 60 * 60];

type Props = {
  t: {
    limit_your_budget: string,
    use_all_balance: string,
    error_budget_too_low: string,
    error_budget_too_high: string,
    limit_your_time: string,
    get_status_alerts: string,
    want_break_after: string,
    for_how_long: string,
    play: string,
    minutes_abbreviated: string,
    hours_abbreviated: string,
    days_abbreviated: string,
  },
  balance: number,
  currency: string,
  locale: string,
};

type LimitYourBudgetRowType = {
  t: {
    limit_your_budget: string,
  },
  budget: number,
  currency: string,
  locale: string,
  onClickEdit: () => void,
};

type LimitYourTimeRowType = {
  t: {
    limit_your_time: string,
  },
  /* chosen time limit */
  value: ?number,
  /* pill options where value is number of seconds */
  options: Array<{ value: number, label: string }>,
  onChange: number => void,
};

type StatusAlertsEveryRowType = {
  t: {
    get_status_alerts: string,
  },
  /* chosen period of time between alerts */
  value: ?number,
  /* pill options where value is number of seconds */
  options: Array<{ value: number, label: string }>,
  onChange: number => void,
};

type WantBreakAfterRowType = {
  t: {
    want_break_after: string,
    for_how_long: string,
  },
  /* if a user wants a break after playing or not */
  value: ?boolean,
  onChange: boolean => void,
  /* how long a break should be */
  breakValue: ?number,
  /* pill options where value is number of seconds */
  breakOptions: Array<{ value: number, label: string }>,
  onChangeBreak: number => void,
};

type IsPlayActiveType = {
  budget: ?number,
  time: ?number,
  alertsEvery: ?number,
  wantsBreak: ?boolean,
  breakAfter: ?number,
};

export function ConfigurationForm(props: Props) {
  const { currency, locale, t } = props;
  const [screen, setScreen] = useState(SCREEN_TYPES.LIMIT_YOUR_BUDGET);
  const [budget, setBudget] = useState();
  const [time, setTime] = useState();
  const [alertsEvery, setAlertsEvery] = useState();
  const [wantsBreak, setWantsBreak] = useState();
  const [breakAfter, setBreakAfter] = useState();
  const onClickEditBudget = useCallback(() => {
    setScreen(SCREEN_TYPES.LIMIT_YOUR_BUDGET);
  }, [setScreen]);
  const onSubmitBudget = useCallback(
    submittedBudget => {
      setBudget(submittedBudget);
      setScreen(SCREEN_TYPES.FORM);
    },
    [setBudget, setScreen]
  );
  const mapSecondsToPillOpts = map(seconds => ({
    value: seconds,
    label: localiseTimeInterval({
      seconds,
      t: {
        seconds: "unused",
        minutes: t.minutes_abbreviated,
        hours: t.hours_abbreviated,
        days: t.days_abbreviated,
      },
    }),
  }));

  if (screen === SCREEN_TYPES.LIMIT_YOUR_BUDGET) {
    return (
      <LimitYourBudget {...props} budget={budget} onSubmit={onSubmitBudget} />
    );
  }

  return (
    <Flex direction="vertical" className="u-height--1/1 u-padding--md">
      <LimitYourBudgetRow
        {...props}
        budget={budget}
        onClickEdit={onClickEditBudget}
      />
      <LimitYourTimeRow
        t={t}
        value={time}
        options={mapSecondsToPillOpts(LIMIT_YOUR_TIME_OPTS_2)}
        onChange={setTime}
      />
      <StatusAlertsEveryRow
        t={t}
        value={alertsEvery}
        options={mapSecondsToPillOpts(STATUS_ALERTS_EVERY_OPTS_2)}
        onChange={setAlertsEvery}
      />
      <WantBreakAfterRow
        t={t}
        value={wantsBreak}
        onChange={setWantsBreak}
        breakValue={breakAfter}
        breakOptions={mapSecondsToPillOpts(WANT_BREAK_AFTER_YES_OPTS_2)}
        onChangeBreak={setBreakAfter}
      />
      <Button
        size="md"
        variant="primary"
        disabled={
          !isPlayActive({ budget, time, alertsEvery, wantsBreak, breakAfter })
        }
      >
        <span className="o-flex__block c-scs__form__play-btn__label">
          {t.play}
        </span>
        <PlayIcon />
      </Button>
    </Flex>
  );
}

export function isPlayActive(props: IsPlayActiveType): boolean {
  const { budget, time, alertsEvery, wantsBreak, breakAfter } = props;

  return Boolean(
    budget &&
      time &&
      alertsEvery &&
      // check explicitly for false as unset is not accepted
      ((wantsBreak && breakAfter) || wantsBreak === false)
  );
}

function LimitYourBudgetRow(props: LimitYourBudgetRowType) {
  const { budget, currency, locale, t, onClickEdit } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.limit_your_budget}
      </Text>
      <Flex justify="space-between" align="center">
        <Text tag="span" className="u-font-weight-bold">
          {formatCurrency({ value: budget, currency, locale })}
        </Text>
        <Button
          variant="secondary"
          size="sm"
          className="u-padding"
          onClick={onClickEdit}
        >
          <EditIcon className="t-color-black" />
        </Button>
      </Flex>
    </Flex>
  );
}

function LimitYourTimeRow(props: LimitYourTimeRowType) {
  const { t, value, options, onChange } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.limit_your_time}
      </Text>
      <PillSelector options={options} onChange={onChange} value={value} />
    </Flex>
  );
}

function StatusAlertsEveryRow(props: StatusAlertsEveryRowType) {
  const { t, value, options, onChange } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.get_status_alerts}
      </Text>
      <PillSelector options={options} onChange={onChange} value={value} />
    </Flex>
  );
}

function WantBreakAfterRow(props: WantBreakAfterRowType) {
  const { t, value, onChange, onChangeBreak, breakValue, breakOptions } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.want_break_after}
      </Text>
      <PillSelector
        options={WANT_BREAK_AFTER_OPTS}
        onChange={onChange}
        value={value}
      />
      {value && (
        <>
          <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
            {t.for_how_long}
          </Text>
          <PillSelector
            options={breakOptions}
            value={breakValue}
            onChange={onChangeBreak}
          />
        </>
      )}
    </Flex>
  );
}
