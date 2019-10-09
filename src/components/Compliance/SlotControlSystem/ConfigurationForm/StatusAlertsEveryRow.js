// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PillSelector } from "Components/PillSelector";

const STATUS_ALERTS_EVERY_OPTS = [
  { label: "5 min", value: 5 },
  { label: "10 min", value: 10 },
  { label: "15 min", value: 15 },
];

type StatusAlertsEveryRowType = {
  t: {
    get_status_alerts: string,
  },
  /* chosen period of time between alerts */
  value: ?number,
  onChange: number => void,
};

export function StatusAlertsEveryRow(props: StatusAlertsEveryRowType) {
  const { t, value, onChange } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.get_status_alerts}
      </Text>
      <PillSelector
        options={STATUS_ALERTS_EVERY_OPTS}
        onChange={onChange}
        value={value}
      />
    </Flex>
  );
}
