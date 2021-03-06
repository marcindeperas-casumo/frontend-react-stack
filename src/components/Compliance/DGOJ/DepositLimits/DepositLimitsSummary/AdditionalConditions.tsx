import Text from "@casumo/cmp-text";
import * as React from "react";
import * as R from "ramda";
import type { DepositLimitPreadjust } from "Models/playOkay/dgojDepositLimits";
import { interpolateWithJSX } from "Utils";
import { Duration } from "Components/Duration";

type Props = DepositLimitPreadjust & {
  t: {
    approval_required_for_subsequent_increases: string;
    approval_required_for_increase: string;
    responsible_gambling_test_required: string;
    decrease_effective_immediately: string;
    cancellation_allowed: string;
  };
};

export function AdditionalConditions(props: Props) {
  const rules = R.pipe(
    R.map(R.toLower),
    R.map(R.propOr("", R.__, props.t)),
    R.join(" "),
    interpolateWithJSX({
      postIncreaseWindow: (
        <Duration duration={props.increaseProhibitedAfterwardsFor} />
      ),
    })
  )(props.rules);

  return (
    <Text size="sm" tag="span" className="u-padding-bottom--lg text-grey-50">
      {rules}
    </Text>
  );
}
