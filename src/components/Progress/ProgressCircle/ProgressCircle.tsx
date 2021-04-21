import * as React from "react";
import * as R from "ramda";
import cx from "classnames";
import "./ProgressCircle.scss";

type Props = {
  /** from 0 to 100, represents current progress */
  value?: number;
  fgClassName?: string;
  bgClassName?: string;
  className?: string;
  radius?: number;
  width?: number;
};

export function ProgressCircle({
  value = 0,
  className = "",
  fgClassName = "text-teal-50",
  bgClassName = "text-grey-90",
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
        className={bgClassName}
        r={innerRadius}
      />
      <circle
        cx={radius}
        cy={radius}
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        className={cx("text-opacity-100", fgClassName)}
        r={innerRadius}
        strokeDasharray={circleC}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
}
