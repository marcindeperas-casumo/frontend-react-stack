// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PillSelector } from "Components/PillSelector";

type StatusAlertsEveryRowType = {
  t: {
    get_status_alerts: string,
  },
  /* chosen period of time between alerts */
  value: ?number,
  options: Array<{ value: String, label: string }>,
  onChange: number => void,
};

export function StatusAlertsEveryRow(props: StatusAlertsEveryRowType) {
  const { t, value, options, onChange } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom t-border-grey-5 u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.get_status_alerts}
      </Text>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <PillSelector options={options} onChange={onChange} value={value} />
    </Flex>
  );
}
