// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { PlayIcon } from "@casumo/cmp-icons";
import { LimitYourBudget } from "./LimitYourBudget/LimitYourBudget";
import { LimitYourBudgetRow } from "./LimitYourBudgetRow";
import { LimitYourTimeRow } from "./LimitYourTimeRow";
import { StatusAlertsEveryRow } from "./StatusAlertsEveryRow";
import { WantBreakAfterRow } from "./WantBreakAfterRow";
import "./ConfigurationForm.scss";

const { useState, useCallback } = React;
const SCREEN_TYPES = {
  FORM: "FORM",
  LIMIT_YOUR_BUDGET: "LIMIT_YOUR_BUDGET",
};

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
  },
  balance: number,
  currency: string,
  locale: string,
};

type IsPlayActiveType = {
  budget: ?number,
  time: ?number,
  alertsEvery: ?number,
  wantsBreak: ?boolean,
  breakAfter: ?number,
};

export function ConfigurationForm(props: Props) {
  const { t } = props;
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
      <LimitYourTimeRow t={t} value={time} onChange={setTime} />
      <StatusAlertsEveryRow
        t={t}
        value={alertsEvery}
        onChange={setAlertsEvery}
      />
      <WantBreakAfterRow
        t={t}
        value={wantsBreak}
        onChange={setWantsBreak}
        breakValue={breakAfter}
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
