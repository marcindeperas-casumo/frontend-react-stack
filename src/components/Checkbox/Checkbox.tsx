import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import { CheckIcon } from "@casumo/cmp-icons";
import "./Checkbox.scss";

export type TInternalCheckboxProps = {
  size?: "sm" | "md";
};

type Props = {
  checked?: boolean;
  onChange: (active: boolean) => void;
  renderChecked?: (props: TInternalCheckboxProps) => React.ReactNode;
  renderUnchecked?: (props: TInternalCheckboxProps) => React.ReactNode;
} & TInternalCheckboxProps;

const CheckboxUnchecked = ({ size }: TInternalCheckboxProps) => (
  <div
    className={cx(
      "c-checkbox u-cursor--pointer u-padding--md t-border-r--circle border-current o-ratio text-grey-20 bg-grey-0",
      { "c-checkbox__sm": size === "sm" }
    )}
  />
);

const CheckboxChecked = ({ size }: TInternalCheckboxProps) => (
  <div
    className={cx(
      "c-checkbox u-cursor--pointer u-padding--md t-border-r--circle border-current o-ratio text-purple-60 bg-purple-60",
      { "c-checkbox__sm": size === "sm" }
    )}
  >
    <Flex
      align="center"
      justify="center"
      className="o-ratio__content u-padding--sm"
    >
      <CheckIcon className="text-white" />
    </Flex>
  </div>
);

export class Checkbox extends React.PureComponent<Props> {
  static defaultProps = {
    checked: false,
    renderChecked: CheckboxChecked,
    renderUnchecked: CheckboxUnchecked,
  };

  render() {
    const { renderChecked, renderUnchecked, checked, onChange, size } =
      this.props;

    return (
      <div
        className="u-display--inline-block"
        onClick={() => onChange(!checked)}
      >
        {checked ? renderChecked({ size }) : renderUnchecked({ size })}
      </div>
    );
  }
}
