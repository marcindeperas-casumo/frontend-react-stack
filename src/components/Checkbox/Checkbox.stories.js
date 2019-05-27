// @flow
import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const stories = storiesOf("Checkbox", module);

type Props = {};

type State = {
  checked: boolean,
};

class CheckboxContainer extends Component<Props, State> {
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
        <Checkbox checked={this.state.checked} onChange={this.onChange} />
        <p>I am {checked ? "checked" : "unchecked"}</p>
      </>
    );
  }
}

stories.add("Default", () => <CheckboxContainer />);
