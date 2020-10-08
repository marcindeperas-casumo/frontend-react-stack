// @flow
import * as React from "react";
import * as R from "ramda";
import "./ProgressCircle.scss";

type Props = {
  /** from 0 to 100, represents current progress */
  value?: number,
  /** color class name without 't-color-' prefix */
  fgColor?: string,
  /** color class name without 't-color-' prefix */
  bgColor?: string,
  className?: string,
  radius?: number,
  width?: number,
};

export function ProgressCircle({
  value = 0,
  className = "",
  fgColor = "teal-50",
  bgColor = "grey-90",
  radius = 25,
  width = 5,
}: Props) {
  const innerRadius = radius - width / 2;
  const total = radius * 2;
  const circleC = 2 * Math.PI * innerRadius;
  const dashOffset = circleC - (circleC * R.clamp(0, 100, value)) / 100;

  return (
    <svg
      className={`c-progress-circle ${className}`}
      viewBox={`0 0 ${total} ${total}`}
      fill="none"
    >
      <circle
        cx={radius}
        cy={radius}
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        className={`t-color-${bgColor}`}
        r={innerRadius}
      />
      <circle
        cx={radius}
        cy={radius}
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        className={`t-opacity-color--100 t-color-${fgColor}`}
        r={innerRadius}
        strokeDasharray={circleC}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
}
