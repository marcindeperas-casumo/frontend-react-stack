// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PillSelector } from "Components/PillSelector";

const LIMIT_YOUR_TIME_OPTS = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "1 hr", value: 60 },
  { label: "4 hr", value: 240 },
];

type LimitYourTimeRowType = {
  t: {
    limit_your_time: string,
  },
  /* chosen time limit */
  value: ?number,
  onChange: number => void,
};

export function LimitYourTimeRow(props: LimitYourTimeRowType) {
  const { t, value, onChange } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.limit_your_time}
      </Text>
      <PillSelector
        options={LIMIT_YOUR_TIME_OPTS}
        onChange={onChange}
        value={value}
      />
    </Flex>
  );
}
