import Flex from "@casumo/cmp-flex";
import { CheckIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { Checkbox } from "Components/Checkbox/Checkbox";

type Props = {
  checked?: boolean;
  onChange: (active: boolean) => void;
};

const CheckboxUnchecked = () => (
  <div className="c-checkbox u-cursor--pointer t-border-r t-border-current-color o-ratio text-grey-20 bg-white" />
);

const CheckboxChecked = () => (
  <div className="c-checkbox u-cursor--pointer t-border-r t-border-current-color o-ratio text-purple-60 bg-purple-60">
    <Flex
      align="center"
      justify="center"
      className="o-ratio__content u-padding--sm"
    >
      <CheckIcon className="text-white" />
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
