// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Text from "@casumo/cmp-text";
import isNotChromatic from "Storybook/isNotChromatic";
import { Counter } from "./";

const stories = storiesOf("Counter", module);

type Props = {};

type State = {
  start: number,
  end: number,
};

class MockTimerUpdate extends React.Component<Props, State> {
  state = {
    start: 0,
    end: 12500000,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        start: 12500000,
        end: 12503000,
      });
    }, 5000);
  }

  render() {
    return (
      <Counter
        start={this.state.start}
        end={this.state.end}
        render={state => <Formatter number={state.value} />}
      />
    );
  }
}

const Formatter = ({ number }) => {
  const formatter = new Intl.NumberFormat("mt-MT", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Text
      style={{ fontFamily: "monospace" }}
      className="u-font-weight-bold"
      size="lg"
    >
      {formatter.format(number)}
    </Text>
  );
};

if (isNotChromatic) {
  stories.add("Default", () => (
    <Counter end={200000000} render={state => <div>{state.value}</div>} />
  ));

  stories.add("With Update", () => <MockTimerUpdate />);
}
