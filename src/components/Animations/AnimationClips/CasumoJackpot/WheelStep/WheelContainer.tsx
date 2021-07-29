import * as React from "react";
import { Wheel } from "./Wheel";
import WheelTickerHorizontal from "./svg/wheelTickerHorizontal.svg";
import WheelTickerVertical from "./svg/wheelTickerVertical.svg";

export const ticker = {
  horizontal: <WheelTickerHorizontal />,
  vertical: <WheelTickerVertical />,
};

type Props = {
  wonPotKey: string;
  onShowNext: () => void;
  config: any;
};
export function WheelContainer(props: Props) {
  return (
    <Wheel
      t={props.config.settings.t}
      wonPotKey={props.config.settings.wonPotKey}
      numberOfTraces={3}
      gap={0}
      velocityToGapRatio={1}
      rotations={5 * 360}
      wheelConfigPreset={{
        frequency: 0.85,
        damping: 0.87,
        precision: 0.001,
      }}
      tickerConfigPreset={{
        frequency: 0.6,
        damping: 0.46,
      }}
      potMap={props.config.settings.potMap}
      potColors={props.config.settings.potColors}
      svgFiles={props.config.settings.svgFiles}
      ticker={ticker}
      onAnimationEnd={props.onShowNext}
    />
  );
}