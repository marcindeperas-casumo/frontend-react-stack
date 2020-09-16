// @flow
import * as React from "react";
import "./ProgressCircle.scss";

type Props = {
  /** from 0 to 100, represents current progress */
  value: number,
  /** color class name without 't-color-' prefix */
  fgColor?: string,
  /** color class name without 't-color-' prefix */
  bgColor?: string,
  className?: string,
};

const CIRCLE_R = 45;
const CIRCLE_C = 2 * Math.PI * CIRCLE_R;

export function ProgressCircle({
  value,
  className = "",
  fgColor = "teal-50",
  bgColor = "grey-90",
}: Props) {
  const dashOffset = CIRCLE_C - (CIRCLE_C / 100) * value;

  return (
    <svg
      className={`c-progress-circle ${className}`}
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle
        cx="50"
        cy="50"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        className={`t-color-${bgColor}`}
        r={CIRCLE_R}
      />
      <circle
        cx="50"
        cy="50"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        className={`t-color-${fgColor}`}
        r={CIRCLE_R}
        strokeDasharray={CIRCLE_C}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
}
