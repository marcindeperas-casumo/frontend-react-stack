// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PillSelector } from "Components/PillSelector";

const WANT_BREAK_AFTER_OPTS = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
const WANT_BREAK_AFTER_YES_OPTS = [
  { label: "1 hr", value: 1 },
  { label: "2 hr", value: 2 },
  { label: "4 hr", value: 4 },
  { label: "1 dy", value: 24 },
];

type WantBreakAfterRowType = {
  t: {
    want_break_after: string,
    for_how_long: string,
  },
  /* if a user wants a break after playing or not */
  value: ?boolean,
  onChange: boolean => void,
  /* how long a break should be */
  breakValue: ?number,
  onChangeBreak: number => void,
};

export function WantBreakAfterRow(props: WantBreakAfterRowType) {
  const { t, value, onChange, onChangeBreak, breakValue } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.want_break_after}
      </Text>
      <PillSelector
        options={WANT_BREAK_AFTER_OPTS}
        onChange={onChange}
        value={value}
      />
      {value && (
        <>
          <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
            {t.for_how_long}
          </Text>
          <PillSelector
            options={WANT_BREAK_AFTER_YES_OPTS}
            value={breakValue}
            onChange={onChangeBreak}
          />
        </>
      )}
    </Flex>
  );
}
