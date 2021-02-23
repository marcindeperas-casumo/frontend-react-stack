// @flow
import * as React from "react";
import "./progressArc.scss";

type Props = {
  /** from 0 to 100, represents current progress */
  value: number,
};
// total length of svg path, taken from .getTotalLength()
const PATH_LENGTH = 55.96251678466797;

export function ProgressArc(props: Props) {
  /**
   * I couldn't find matching progress component, it looked simple enough to implement.
   * If you don't know this trick and it looks like magic read that:
   *    https://css-tricks.com/svg-line-animation-works/
   */
  const dashOffset = PATH_LENGTH - (PATH_LENGTH / 100) * props.value;

  return (
    <svg className="c-progress-arc" viewBox="0 0 28 25" fill="none">
      <path
        className="t-color-purple-60"
        d="M5.47164 22.2913C3.32656 20.1405 2 17.1689 2 13.8861C2 10.6033 3.32656 7.63176 5.47164 5.48093C7.61672 3.33011 10.5803 2 13.8544 2C17.1285 2 20.0921 3.33011 22.2371 5.48093C24.3822 7.63176 25.7088 10.6033 25.7088 13.8861C25.7088 17.1689 24.3822 20.1405 22.2371 22.2913"
        stroke="currentColor"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeDasharray={PATH_LENGTH}
        strokeDashoffset={dashOffset}
      />
      <path
        className="t-color-teal-50"
        opacity="0.6"
        d="M5.47164 22.2913C3.32656 20.1405 2 17.1689 2 13.8861C2 10.6033 3.32656 7.63176 5.47164 5.48093C7.61672 3.33011 10.5803 2 13.8544 2C17.1285 2 20.0921 3.33011 22.2371 5.48093C24.3822 7.63176 25.7088 10.6033 25.7088 13.8861C25.7088 17.1689 24.3822 20.1405 22.2371 22.2913"
        stroke="currentColor"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
