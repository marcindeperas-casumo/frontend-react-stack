import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs/react";
import React, { Component } from "react";
import { PillSelector } from "./PillSelector";
import options from "./__mocks__/options.json";

const stories = storiesOf("PillSelector", module);
const optionsForSelector = options.map(option => option.value);

type Props = {
  value: string;
  disabled: boolean;
};

type State = {
  value: any;
};

class PillSelectorContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value || null,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (value: string) => {
    this.setState({ value });
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextState.value !== this.state.value) {
      return true;
    }
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
      return true;
    }

    return false;
  }

  render() {
    const { value } = this.state;

    return (
      <>
        <PillSelector
          options={options}
          value={value}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        <div className="u-margin-top--lg">
          {value ? `Value selected: ${value}` : "No option selected"}
        </div>
      </>
    );
  }
}

stories.add("Default", () => {
  const optionSelector = select(
    "Value",
    optionsForSelector,
    optionsForSelector[0]
  );
  const isDisabled = boolean("Is disabled", true);

  return <PillSelectorContainer value={optionSelector} disabled={isDisabled} />;
});
