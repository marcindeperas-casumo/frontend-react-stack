// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import { Checkbox } from "Components/Checkbox/Checkbox";
import "./Toggle.scss";

type Props = {
  checked?: boolean,
  onChange: (active: boolean) => void,
};

const Unchecked = () => (
  <Flex
    justify="start"
    className="c-toggle u-cursor-pointer t-border-r--pill u-overflow-hidden t-background-chrome-light-1 t-color-white"
  >
    <svg width="28" viewBox="0 0 28 28" className="c-toggle-circle--inactive">
      <circle cx="14" cy="14" r="14" fill="currentColor" />
    </svg>
  </Flex>
);

const Checked = () => (
  <Flex
    justify="start"
    className="c-toggle u-cursor-pointer t-border-r--pill u-overflow-hidden t-background-plum t-color-white"
  >
    <svg width="28" viewBox="0 0 28 28" className="c-toggle-circle--active">
      <circle cx="14" cy="14" r="14" fill="currentColor" />
    </svg>
  </Flex>
);

export class Toggle extends PureComponent<Props> {
  render() {
    return (
      <Checkbox
        {...this.props}
        renderChecked={Checked}
        renderUnchecked={Unchecked}
      />
    );
  }
}
