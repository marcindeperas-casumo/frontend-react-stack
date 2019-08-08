// @flow
import React, { PureComponent, type Node } from "react";
import Flex from "@casumo/cmp-flex";
import { TickIcon } from "@casumo/cmp-icons";
import "./Checkbox.scss";

type Props = {
  checked?: boolean,
  onChange: (active: boolean) => void,
  renderChecked: () => Node,
  renderUnchecked: () => Node,
};

const CheckboxUnchecked = () => (
  <div className="c-checkbox u-cursor-pointer u-padding--md t-border-r--circle t-border-current-color o-ratio t-color-chrome t-background-chrome-light-2" />
);

const CheckboxChecked = () => (
  <div className="c-checkbox u-cursor-pointer u-padding--md t-border-r--circle t-border-current-color o-ratio t-color-plum t-background-plum">
    <Flex
      align="center"
      justify="center"
      className="o-ratio__content u-padding--sm"
    >
      <TickIcon className="t-color-white" />
    </Flex>
  </div>
);

export class Checkbox extends PureComponent<Props> {
  static defaultProps = {
    checked: false,
    renderChecked: CheckboxChecked,
    renderUnchecked: CheckboxUnchecked,
  };

  render() {
    const { renderChecked, renderUnchecked, checked, onChange } = this.props;

    return (
      <div
        className="u-display--inline-block"
        onClick={() => onChange(!checked)}
      >
        {checked ? renderChecked() : renderUnchecked()}
      </div>
    );
  }
}
