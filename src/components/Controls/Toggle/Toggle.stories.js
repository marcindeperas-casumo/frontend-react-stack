// @flow
import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import Toggle from "./";

const stories = storiesOf("Controls/Toggle", module);

type Props = {};

type State = {
  checked: boolean,
};

class ToggleContainer extends Component<Props, State> {
  state = {
    checked: false,
  };

  onChange = checked => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;
    return (
      <>
        <Toggle checked={this.state.checked} onChange={this.onChange} />
        <p>I am {checked ? "checked" : "unchecked"}</p>
      </>
    );
  }
}

stories.add("Default", () => <ToggleContainer />);
