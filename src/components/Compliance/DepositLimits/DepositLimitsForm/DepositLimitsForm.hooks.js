// @flow
import * as React from "react";

type Limits = {
  daily: ?number,
  weekly: ?number,
  monthly: ?number,
};

type LimitInput = {
  value: ?number,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
};

function useInput(initialValue: ?number = null): LimitInput {
  const [value, setValue] = React.useState(initialValue);

  return {
    value,
    onChange: function onChangeUseInputHook(event) {
      // $FlowIgnore: flow doesn't support optional method calls
      const tmp = parseInt(event.target.value?.match(/\d/g)?.join(""));
      const val = Number.isNaN(tmp) ? null : tmp;

      setValue(val);
    },
  };
}

export function useDepositLimitInputs(initialLimits: Limits) {
  const daily = useInput(initialLimits.daily);
  const weekly = useInput(initialLimits.weekly);
  const monthly = useInput(initialLimits.monthly);

  return {
    daily,
    weekly,
    monthly,
  };
}
