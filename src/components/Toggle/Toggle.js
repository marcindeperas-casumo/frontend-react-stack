// @flow
import React, { PureComponent } from "react";
import { Checkbox } from "Components/Checkbox/Checkbox";
import "./Toggle.scss";

type Props = {
  checked?: boolean,
  onChange: (active: boolean) => void,
};

const Unchecked = () => (
  <div className="c-toggle u-display--inline-block u-cursor-pointer t-border-r--pill u-overflow-hidden t-background-chrome">
    <svg>
      <circle
        className="c-toggle-circle--inactive"
        cy="16"
        r="14"
        fill="#FFF"
      />
    </svg>
  </div>
);

const Checked = () => (
  <div className="c-toggle u-display--inline-block u-cursor-pointer t-border-r--pill u-overflow-hidden t-background-plum">
    <svg>
      <circle className="c-toggle-circle--active" cy="16" r="14" fill="#FFF" />
    </svg>
  </div>
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
