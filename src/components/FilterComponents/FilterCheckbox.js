// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CheckboxSquare } from "Components/Checkbox/CheckboxSquare";

type Props = {
  isActive: boolean,
  title: string,
  onChange: () => void,
};
export function FilterCheckbox(props: Props) {
  return (
    <Flex
      align="center"
      justify="space-between"
      className="u-width--full u-padding-y--md t-border-bottom t-color-grey-5"
    >
      <Text className="t-color-grey-90">{props.title}</Text>
      <CheckboxSquare checked={props.isActive} onChange={props.onChange} />
    </Flex>
  );
}
