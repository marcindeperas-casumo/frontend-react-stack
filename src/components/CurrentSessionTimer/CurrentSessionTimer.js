// @flow
import React from "react";
import Timer from "Components/Timer";

type TimeState = {
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
  hasEnded: boolean,
};
type Props = {
  render: (state: TimeState) => string,
  startTime: number,
};

export const CurrentSessionTimer = (props: Props) => {
  return <Timer render={props.render} startTime={props.startTime} />;
};
