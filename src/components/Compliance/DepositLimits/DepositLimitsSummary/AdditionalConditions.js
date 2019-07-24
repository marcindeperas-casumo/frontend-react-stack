// @flow
import * as React from "react";
import * as R from "ramda";
import Text from "@casumo/cmp-text";
import { interpolateWithJSX } from "Utils";
import { ISO8601DurationContainer } from "Components/i18n/ISO8601Duration";
import type { DepositLimitPreadjust } from "Models/playOkay/depositLimits";

type Props = DepositLimitPreadjust & {
  t: {
    approval_required_for_subsequent_increases: string,
    approval_required_for_increase: string,
    responsible_gambling_test_required: string,
    decrease_effective_immediately: string,
    revocation_allowed: string,
  },
};

export function AdditionalConditions(props: Props) {
  const rules = R.pipe(
    R.map(R.toLower),
    R.map(R.propOr("", R.__, props.t)),
    R.join(" "),
    interpolateWithJSX({
      postIncreaseWindow: (
        <ISO8601DurationContainer
          duration={props.increaseProhibitedAfterwardsFor}
        />
      ),
      revocationWindow: (
        <ISO8601DurationContainer duration={props.increaseEffectiveAfter} />
      ),
    })
  )(props.rules);

  return (
    <Text
      size="sm"
      tag="span"
      className="u-padding-bottom--lg t-color-grey-dark-1"
    >
      {rules}
    </Text>
  );
}
