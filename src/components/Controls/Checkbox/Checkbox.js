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

const defaultUnchecked = () => (
  <div className="c-checkbox u-padding--md t-border-r--circle t-border-current-color o-ratio t-color-grey-light-1 t-background-white" />
);

const defaultChecked = () => (
  <div className="c-checkbox u-padding--md t-border-r--circle t-border-current-color o-ratio t-color-green-light-1 t-background-green-light-1">
    <Flex
      align="center"
      justify="center"
      className="o-ratio__content u-padding--sm"
    >
      <TickIcon className="t-color-white" />
    </Flex>
  </div>
);

class Checkbox extends PureComponent<Props> {
  static defaultProps = {
    checked: false,
    renderUnchecked: defaultUnchecked,
    renderChecked: defaultChecked,
  };

  render() {
    const { renderChecked, renderUnchecked, checked, onChange } = this.props;
    return (
      <span onClick={() => onChange(!checked)}>
        {checked ? renderChecked() : renderUnchecked()}
      </span>
    );
  }
}

export default Checkbox;
