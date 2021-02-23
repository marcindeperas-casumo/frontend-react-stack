// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PillSelector } from "Components/PillSelector";

const castToBoolean = (value: string) => (value === "true" ? true : false);

type WantBreakAfterRowType = {
  t: {
    want_break_after: string,
    want_break_after_opts: Array<{ value: string, label: string }>,
    for_how_long: string,
  },
  /* if a user wants a break after playing or not */
  value: ?boolean,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  onChange: boolean => void,
  /* how long a break should be */
  breakValue: ?number,
  /* pill options where value is number of seconds */
  breakOptions: Array<{ value: number, label: string }>,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  onChangeBreak: number => void,
};

export function WantBreakAfterRow(props: WantBreakAfterRowType) {
  const { t, value, onChangeBreak, breakValue, breakOptions } = props;
  const onChange = v => {
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    props.onChange(castToBoolean(v));
  };

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom t-border-grey-5 u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.want_break_after}
      </Text>
      <PillSelector
        options={t.want_break_after_opts}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        onChange={onChange}
        value={String(value)}
      />
      {value && (
        <>
          <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
            {t.for_how_long}
          </Text>
          <PillSelector
            options={breakOptions}
            value={breakValue}
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            onChange={onChangeBreak}
          />
        </>
      )}
    </Flex>
  );
}
