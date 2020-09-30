// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ChipChoice } from "@casumo/cmp-chip";

type Props = {
  isActive: boolean,
  title: string,
  onChange: () => void,
};
export function FilterChip(props: Props) {
  return (
    <Flex.Item className="u-margin-right--sm u-margin-bottom--sm">
      <ChipChoice onClick={props.onChange} isActive={props.isActive}>
        {props.title}
      </ChipChoice>
    </Flex.Item>
  );
}
