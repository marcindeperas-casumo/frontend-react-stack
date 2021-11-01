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
      numberOfTraces={12}
      gap={0}
      velocityToGapRatio={1}
      rotations={8 * 360}
      wheelConfigPreset={{
        frequency: 6,
        damping: 1,
        precision: 0.001,
      }}
      tickerConfigPreset={{
        frequency: 0.6,
        damping: 0.7,
      }}
      potMap={props.config.settings.potMap}
      potColors={props.config.settings.potColors}
      svgFiles={props.config.settings.svgFiles}
      ticker={ticker}
      onAnimationEnd={props.onShowNext}
    />
  );
}
