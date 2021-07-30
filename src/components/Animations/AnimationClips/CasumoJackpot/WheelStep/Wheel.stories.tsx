// eslint-disable-next-line filenames/match-exported
import * as React from "react";
import { Wheel } from "./Wheel";
import { ticker } from "./WheelContainer";
import { wheelProps } from "./constants";

const disableControl = {
  table: {
    disable: true,
  },
};

const story = {
  title: "Animations/CasumoJackpot",
  component: Wheel,
  parameters: {
    noGlobalDecorator: true,
    expanded: true,
  },
  args: {
    wonPotKey: "pot4",
    wheelFrequency: 6,
    wheelDamping: 1,
    tickerFrequency: 0.6,
    tickerDamping: 0.7,
    rotations: 8,
    numberOfTraces: 6,
    gap: 0,
    velocityToGapRatio: 1,
  },
  argTypes: {
    wonPotKey: {
      description: "Pot you would like to win from next spin",
      options: ["pot1", "pot2", "pot3", "pot4"],
      control: {
        type: "select",
        labels: {
          pot1: "Mini",
          pot2: "Minor",
          pot3: "Major",
          pot4: "Mega",
        },
      },
    },
    wheelDamping: {
      table: {
        category: "Wheel spring config",
      },
      description:
        "Controls how much or little overshoot there is from 100% damping, where there will be no overshoot to 0% damping where the spring would oscillate indefinitely.",
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.005,
      },
    },
    wheelFrequency: {
      table: {
        category: "Wheel spring config",
      },
      description:
        "Controls how quickly the value will try to get to the target from 0, where transition will be instant to infinity",
      control: {
        type: "range",
        min: 0,
        max: 20,
        step: 0.005,
      },
    },
    tickerDamping: {
      table: {
        category: "Ticker spring config",
      },
      description:
        "Controls how much or little overshoot there is from 100% damping, where there will be no overshoot to 0% damping where the spring would oscillate indefinitely.",
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.005,
      },
    },
    tickerFrequency: {
      table: {
        category: "Ticker spring config",
      },
      description:
        "Controls how quickly the value will try to get to the target from 0, where transition will be instant to infinity",
      control: {
        type: "range",
        min: 0,
        max: 20,
        step: 0.005,
      },
    },
    rotations: {
      description: "Number of wheel rotations before you win",
      control: {
        type: "number",
      },
    },
    numberOfTraces: {
      table: {
        category: "Wheel motion",
      },
      description:
        "Number of wheel traces that will be rendered, high values will kill performance",
      control: {
        type: "range",
        min: 0,
        max: 30,
        step: 1,
      },
    },
    velocityToGapRatio: {
      table: {
        category: "Wheel motion",
      },
      description:
        "When other than 0 it'll take animation velocity, multiply it by this value and use it instead of gap",
      type: "number",
    },
    gap: {
      table: {
        category: "Wheel motion",
      },
      description: "Difference in rotation between wheel traces in degrees",
      control: {
        type: "number",
      },
    },
    potMap: disableControl,
    wheelConfigPreset: disableControl,
    tickerConfigPreset: disableControl,
    svgFiles: disableControl,
    potColors: disableControl,
    t: disableControl,
    ticker: disableControl,
    onAnimationEnd: disableControl,
    isWheelConfigurator: disableControl,
  },
};
export default story;

const Template = ({
  wheelFrequency,
  wheelDamping,
  tickerFrequency,
  tickerDamping,
  rotations,
  ...args
}: typeof story.args) => {
  const wheelConfigPreset = {
    frequency: wheelFrequency,
    damping: wheelDamping,
    precision: 0.001,
  };
  const tickerConfigPreset = {
    frequency: tickerFrequency,
    damping: tickerDamping,
    precision: 0.001,
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#8F72D6",
      }}
    >
      <Wheel
        {...args}
        {...wheelProps}
        rotations={rotations * 360}
        wheelConfigPreset={wheelConfigPreset}
        tickerConfigPreset={tickerConfigPreset}
        ticker={ticker}
        onAnimationEnd={() => {}}
        isWheelConfigurator
      />
    </div>
  );
};
export const WheelStep = Template.bind({});
