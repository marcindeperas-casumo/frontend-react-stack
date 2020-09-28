// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { CheckIcon } from "@casumo/cmp-icons";
import { Checkbox } from "Components/Checkbox/Checkbox";

type Props = {
  checked?: boolean,
  onChange: (active: boolean) => void,
};

const CheckboxUnchecked = () => (
  <div className="c-checkbox u-cursor-pointer t-border-r t-border-current-color o-ratio t-color-grey-20 t-background-white" />
);

const CheckboxChecked = () => (
  <div className="c-checkbox u-cursor-pointer t-border-r t-border-current-color o-ratio t-color-purple-60 t-background-purple-60">
    <Flex
      align="center"
      justify="center"
      className="o-ratio__content u-padding--sm"
    >
      <CheckIcon className="t-color-white" />
    </Flex>
  </div>
);

export const CheckboxSquare = (props: Props) => (
  <Checkbox
    {...props}
    renderChecked={CheckboxChecked}
    renderUnchecked={CheckboxUnchecked}
  />
);
