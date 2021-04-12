import * as React from "react";
import * as R from "ramda";
import { Duration } from "luxon";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import { PlayIcon } from "@casumo/cmp-icons";
import { interpolate } from "Utils";
import { TCurrencyCode } from "Src/constants";
import { LimitYourBudget } from "./LimitYourBudget/LimitYourBudget";
import { LimitYourBudgetRow } from "./LimitYourBudgetRow";
import { LimitYourTimeRow } from "./LimitYourTimeRow";
import { StatusAlertsEveryRow } from "./StatusAlertsEveryRow";
import { WantBreakAfterRow } from "./WantBreakAfterRow";
import { isBudgetInvalid } from "./Utils";
import "./ConfigurationForm.scss";

const SCREEN_TYPES = {
  FORM: "FORM",
  LIMIT_YOUR_BUDGET: "LIMIT_YOUR_BUDGET",
};
const LIMIT_YOUR_TIME_OPTS = [
  { minutes: 15 },
  { minutes: 30 },
  { hours: 1 },
  { hours: 4 },
];
const STATUS_ALERTS_EVERY_OPTS = [
  { minutes: 5 },
  { minutes: 10 },
  { minutes: 15 },
];
const WANT_BREAK_AFTER_YES_OPTS = [
  { hours: 1 },
  { days: 1 },
  { days: 7 },
  { days: 30 },
];

export type ConfigurationFormContent = {
  limit_your_budget: string;
  use_all_balance: string;
  error_budget_too_low: string;
  error_budget_too_high: string;
  limit_your_time: string;
  get_status_alerts: string;
  want_break_after: string;
  want_break_after_opts: Array<{ value: string; label: string }>;
  for_how_long: string;
  play: string;
  minutes_abbreviated: string;
  hours_abbreviated: string;
  days_abbreviated: string;
};

export type ConfigurationFormData = {
  budget: number;
  currency: string;
  /** in seconds */
  time: number;
  /** in seconds */
  alertsEvery: number;
  /** in seconds */
  breakAfter?: number;
};

type ConfigurationFormProps = {
  t: ConfigurationFormContent;
  balance: number;
  currency: TCurrencyCode;
  locale: string;
  fetchContentIfNecessary: () => void;
  createSession: (formData: ConfigurationFormData) => void;
  isCreatingSession: boolean;
};

type IsPlayActiveType = {
  balance: number;
  budget: number | undefined;
  time: number | undefined;
  alertsEvery: number | undefined;
  wantsBreak: boolean | undefined;
  breakAfter: number | undefined;
};

export function ConfigurationForm(props: ConfigurationFormProps) {
  const {
    t,
    balance,
    currency,
    fetchContentIfNecessary,
    createSession,
    isCreatingSession,
  } = props;
  const [screen, setScreen] = React.useState(SCREEN_TYPES.LIMIT_YOUR_BUDGET);
  const [budget, setBudget] = React.useState<number>();
  const [time, setTime] = React.useState<number>();
  const [alertsEvery, setAlertsEvery] = React.useState<number>();
  const [wantsBreak, setWantsBreak] = React.useState<boolean>();
  const [breakAfter, setBreakAfter] = React.useState<number>();
  const formData: ConfigurationFormData = {
    currency,
    budget: budget || 0,
    time: time || 0,
    alertsEvery: alertsEvery || 0,
    breakAfter,
  };
  const onClickEditBudget = React.useCallback(() => {
    setScreen(SCREEN_TYPES.LIMIT_YOUR_BUDGET);
  }, [setScreen]);
  const onSubmitBudget = React.useCallback(
    submittedBudget => {
      setBudget(submittedBudget);
      setScreen(SCREEN_TYPES.FORM);
    },
    [setBudget, setScreen]
  );

  React.useEffect(() => {
    fetchContentIfNecessary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (screen === SCREEN_TYPES.LIMIT_YOUR_BUDGET) {
    return (
      <LimitYourBudget {...props} budget={budget} onSubmit={onSubmitBudget} />
    );
  }

  return (
    <Flex direction="vertical" className="u-height--1/1 u-padding-x--md">
      <LimitYourBudgetRow
        {...props}
        budget={budget}
        onClickEdit={onClickEditBudget}
      />
      <LimitYourTimeRow
        t={t}
        value={time}
        options={mapDurationToPillOpts(t)(LIMIT_YOUR_TIME_OPTS)}
        onChange={setTime}
      />
      <StatusAlertsEveryRow
        t={t}
        value={alertsEvery}
        options={mapDurationToPillOpts(t)(STATUS_ALERTS_EVERY_OPTS)}
        onChange={setAlertsEvery}
      />
      <WantBreakAfterRow
        t={t}
        value={wantsBreak}
        onChange={setWantsBreak}
        breakValue={breakAfter}
        breakOptions={mapDurationToPillOpts(t)(WANT_BREAK_AFTER_YES_OPTS)}
        onChangeBreak={setBreakAfter}
      />
      <ButtonPrimary
        size="md"
        variant="primary"
        isDisabled={
          !isPlayActive({
            balance,
            budget,
            time,
            alertsEvery,
            wantsBreak,
            breakAfter,
          })
        }
        isLoading={isCreatingSession}
        onClick={() => createSession(formData)}
      >
        <span className="u-margin-right--sm">{t.play}</span>
        <PlayIcon />
      </ButtonPrimary>
    </Flex>
  );
}

export function isPlayActive(props: IsPlayActiveType): boolean {
  const { balance, budget, time, alertsEvery, wantsBreak, breakAfter } = props;

  return Boolean(
    typeof budget === "number" &&
      !isBudgetInvalid({
        budget,
        balance,
      }) &&
      time &&
      alertsEvery &&
      // check explicitly for false as unset is not accepted
      ((wantsBreak && breakAfter) || wantsBreak === false)
  );
}

const mapDurationToPillOpts = (t: ConfigurationFormContent) =>
  R.map(durationObject => {
    const duration = Duration.fromObject(durationObject);
    const pillOpts = {
      value: duration.as("seconds"),
    };

    if (duration.days > 0) {
      return {
        ...pillOpts,
        label: interpolate(t.days_abbreviated, { value: duration.days }),
      };
    }

    if (duration.hours > 0) {
      return {
        ...pillOpts,
        label: interpolate(t.hours_abbreviated, { value: duration.hours }),
      };
    }

    return {
      ...pillOpts,
      label: interpolate(t.minutes_abbreviated, { value: duration.minutes }),
    };
  });
