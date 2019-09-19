// @flow
import * as React from "react";

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
};

export function ConfigurationForm(props: Props) {}
