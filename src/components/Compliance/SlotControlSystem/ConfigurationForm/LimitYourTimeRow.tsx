import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { PillSelector } from "Components/PillSelector";

type LimitYourTimeRowType = {
  t: {
    limit_your_time: string;
  };
  /* chosen time limit */
  value: number | undefined;
  options: Array<{ value: number; label: string }>;
  onChange: (value: number) => void;
};

export function LimitYourTimeRow(props: LimitYourTimeRowType) {
  const { t, value, options, onChange } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom border-grey-5 u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.limit_your_time}
      </Text>
      <PillSelector options={options} onChange={onChange} value={value} />
    </Flex>
  );
}
