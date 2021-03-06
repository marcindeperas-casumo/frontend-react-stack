import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { PillSelector } from "Components/PillSelector";

const castToBoolean = (value: string) => (value === "true" ? true : false);

type WantBreakAfterRowType = {
  t: {
    want_break_after: string;
    want_break_after_opts: Array<{ value: string; label: string }>;
    for_how_long: string;
  };
  /* if a user wants a break after playing or not */
  value: boolean | undefined;
  onChange: (b: boolean) => void;
  /* how long a break should be */
  breakValue: number | undefined;
  /* pill options where value is number of seconds */
  breakOptions: Array<{ value: number; label: string }>;
  onChangeBreak: (n: number) => void;
};

export function WantBreakAfterRow(props: WantBreakAfterRowType) {
  const { t, value, onChangeBreak, breakValue, breakOptions } = props;
  const onChange = (v: any) => {
    props.onChange(castToBoolean(v));
  };

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom border-grey-5 u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.want_break_after}
      </Text>
      <PillSelector
        options={t.want_break_after_opts}
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
            onChange={onChangeBreak}
          />
        </>
      )}
    </Flex>
  );
}
