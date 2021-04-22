import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { isMobile } from "Components/ResponsiveLayout";
import { CheckboxSquare } from "Components/Checkbox/CheckboxSquare";

type Props = {
  isActive: boolean;
  title: string;
  onChange: () => void;
};
export function FilterCheckbox(props: Props) {
  if (isMobile()) {
    // On tablet/desktop we show this filter in two columns and it differs a lot
    return (
      <Flex
        align="center"
        justify="space-between"
        className="u-width--full u-padding-y--md t-border-bottom text-grey-5"
        onClick={props.onChange}
      >
        <Text className="text-grey-90">{props.title}</Text>
        <CheckboxSquare checked={props.isActive} onChange={() => {}} />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      className="u-width--full u-padding-y--md"
      onClick={props.onChange}
    >
      <CheckboxSquare checked={props.isActive} onChange={() => {}} />
      <Text className="u-padding-left--md text-grey-90">{props.title}</Text>
    </Flex>
  );
}
