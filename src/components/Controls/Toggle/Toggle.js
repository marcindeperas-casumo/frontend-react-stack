// @flow
import React, { PureComponent } from "react";
import Checkbox from "Components/Controls/Checkbox";
import "./Toggle.scss";

type Props = {
  checked?: boolean,
  onChange: (active: boolean) => void,
};

const renderUnchecked = () => (
  <div className="c-toggle t-border-r--pill t-background-grey">
    <svg className="c-toggle-container">
      <circle
        className="c-toggle-circle--inactive"
        cy="16"
        r="14"
        fill="#FFF"
      />
    </svg>
  </div>
);

const renderChecked = () => (
  <div className="c-toggle t-border-r--pill t-background-green-light-1">
    <svg className="c-toggle-container">
      <circle className="c-toggle-circle--active" cy="16" r="14" fill="#FFF" />
    </svg>
  </div>
);

class Toggle extends PureComponent<Props> {
  render() {
    return (
      <Checkbox
        {...this.props}
        renderUnchecked={renderUnchecked}
        renderChecked={renderChecked}
      />
    );
  }
}

export default Toggle;
