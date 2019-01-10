/* eslint-disable fp/no-mutation */
// @flow
import React from "react";

type Props = {
  start: number,
  end: number,
  duration: number,
  decimals: number,
  easeFn: Function,
  render: Function,
};

type State = {
  value: number | string,
};

export const REFRESH_RATE = 1000 / 30;

const easeOutExpo = (t, b, c, d) =>
  parseFloat((c * (-(2 ** ((-10 * t) / d)) + 1) * 1024) / 1023 + b);

class Counter extends React.Component<Props, State> {
  setTimer: Function;
  timer: IntervalID | void;
  easeFn: Function;
  countUp: Function;
  startTime: number;

  constructor(props: Props) {
    super(props);

    const { start = 0, decimals = 0 } = this.props;
    this.easeFn = this.props.easeFn || easeOutExpo;
    this.startTime = new Date().getTime();
    this.state = {
      value: start.toFixed(decimals),
    };
    this.countUp = this.countUp.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.props !== nextProps) {
      const { start = 0, decimals = 0 } = nextProps;
      this.startTime = new Date().getTime();
      this.setState({
        value: start.toFixed(decimals),
      });
      this.clearTimer();
      this.setTimer();
      return true;
    }

    if (this.state !== nextState) {
      return true;
    }

    return false;
  }

  setTimer() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(this.countUp, REFRESH_RATE);
  }

  clearTimer() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  countUp() {
    const { start = 0, end, duration = 2500, decimals = 0 } = this.props;

    const time = new Date().getTime() - this.startTime;
    const difference = end - start;

    // eslint-disable-next-line fp/no-let
    let result;

    if (time < duration) {
      result = this.easeFn(time, start, difference, duration).toFixed(decimals);
    } else {
      result = end.toFixed(decimals);
      this.clearTimer();
    }
    this.setState({ value: result });
  }

  render() {
    return this.props.render(this.state);
  }
}

export default Counter;
