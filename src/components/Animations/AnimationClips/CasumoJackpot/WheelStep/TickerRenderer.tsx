import * as React from "react";
import classNames from "classnames";
import { animated, SpringValue } from "react-spring";
import { findClosest, mapValuesToKey } from "Utils";

type Props = {
  svgRatio: number;
  isVertical: boolean;
  wonPotKey: string;
  rotate: SpringValue<number>;
  scale: SpringValue<number>;
  ticker: {
    horizontal: React.SVGProps<SVGSVGElement>;
    vertical: React.SVGProps<SVGSVGElement>;
  };
  potColors: { [potName: string]: string };
  potMap: { [potName: string]: number[] };
  svgFiles: {
    [potName: string]: string;
  };
  t: {
    startSpinning: string;
    [potKey: string]: string;
  };
};
export function TickerRenderer(props: Props) {
  const valueToPotMap = mapValuesToKey(props.potMap);

  return (
    <animated.div
      className={classNames(
        "o-position--absolute o-flex-align--center o-flex-justify--center",
        {
          "o-flex--horizontal": !props.isVertical,
          "o-flex--vertical": props.isVertical,
        }
      )}
      style={{
        [props.isVertical ? "top" : "right"]: 426 * props.svgRatio,
        zIndex: 1,
        transformOrigin: props.isVertical
          ? `50% ${30 * props.svgRatio}px`
          : 238 * props.svgRatio,
        transform: props.scale.to({
          range: [0, 100],
          output: ["scale(1)", "scale(1.4)"],
          extrapolateLeft: "clamp",
        }),
        flexDirection: props.isVertical ? "column-reverse" : "row",
      }}
    >
      <animated.div
        className="o-flex--horizontal o-flex-align--center o-flex-justify--center"
        style={{
          width: (props.isVertical ? 256 : 207) * props.svgRatio,
          color: props.scale.to({
            range: [0, 98],
            output: ["#4C00C2", props.potColors[props.wonPotKey]],
            extrapolate: "clamp",
          }),
        }}
      >
        {props.isVertical ? props.ticker.vertical : props.ticker.horizontal}
        <animated.span
          className="u-font-weight-black o-position--absolute"
          style={{
            fontSize: 22 * props.svgRatio,
            color: "#FFCA30",
            opacity: props.rotate.to({
              range: [0, 0.1],
              output: [1, 0],
              extrapolate: "clamp",
            }),
          }}
        >
          {props.t.startSpinning}
        </animated.span>
        <animated.div
          className="u-overflow--hidden o-position--absolute"
          style={{ userSelect: "none" }}
        >
          <animated.div
            style={{
              transform: props.rotate.to(deg => {
                const reminder = deg % 360;
                const closest = findClosest(
                  Object.keys(valueToPotMap).map(x => parseInt(x)),
                  reminder
                );
                const diff = reminder - closest;

                return `translateY(${diff * 4 * props.svgRatio}px)`;
              }),
            }}
          >
            <animated.span
              className="u-font-weight-black u-text-transform-uppercase"
              style={{
                letterSpacing: 10 * props.svgRatio,
                fontSize: 28 * props.svgRatio,
                marginRight: -10 * props.svgRatio, // bug: https://stackoverflow.com/a/6949867
                textAlign: "right",
                color: props.scale.to({
                  range: [0, 98],
                  output: ["#FFFFFF", "#4C00C2"],
                  extrapolate: "clamp",
                }),
              }}
            >
              {props.rotate.to(deg => {
                if (deg === 0) {
                  return "";
                }
                const reminder = deg % 360;
                const closest = findClosest(
                  Object.keys(valueToPotMap).map(x => parseInt(x)),
                  reminder
                );

                return props.t[valueToPotMap[closest]];
              })}
            </animated.span>
          </animated.div>
        </animated.div>
      </animated.div>
      <animated.img
        style={{
          opacity: props.scale.to({
            range: [0, 50],
            output: [0, 1],
            extrapolate: "clamp",
          }),
          width: 78 * props.svgRatio,
          height: 78 * props.svgRatio,
        }}
        src={props.svgFiles[props.wonPotKey]}
      />
    </animated.div>
  );
}
