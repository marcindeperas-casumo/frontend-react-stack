import Flex from "@casumo/cmp-flex";
import { CheckIcon } from "@casumo/cmp-icons";
import * as React from "react";
import cx from "classnames";
import { Checkbox, TInternalCheckboxProps } from "Components/Checkbox/Checkbox";

type Props = {
  checked?: boolean;
  size?: "sm" | "md";
  onChange: (active: boolean) => void;
};

const CheckboxUnchecked = ({ size }: TInternalCheckboxProps) => (
  <div
    className={cx(
      "c-checkbox u-cursor--pointer t-border-r border-current o-ratio text-grey-20 bg-white",
      { "c-checkbox__sm": size === "sm" }
    )}
  />
);

const CheckboxChecked = ({ size }: TInternalCheckboxProps) => (
  <div className="c-checkbox u-cursor--pointer t-border-r border-current o-ratio text-purple-60 bg-purple-60">
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
