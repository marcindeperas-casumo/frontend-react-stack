// @flow
import React from "react";

type OwnProps = {
    start: number;
    end: number;
    duration: number;
    decimals: number;
    easeFn: Function;
    render: Function;
};

type State = {
  value: number | string,
};

export const REFRESH_RATE = 1000 / 30;

/**
 * From: http://www.gizma.com/easing/#expo2
 * t: currentTime
 * b: startValue
 * c: changeInValue
 * d: duration
 */
const easeOutExpo = (t: number, b: number, c: number, d: number) =>
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
  parseFloat((c * (-(2 ** ((-10 * t) / d)) + 1) * 1024) / 1023 + b);

type Props = OwnProps & typeof Counter.defaultProps;

export class Counter extends React.Component<Props, State> {
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'setTimer'.
  setTimer: Function;
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'IntervalID'.
  timer: IntervalID | void;
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'countUp'.
  countUp: Function;
  startTime: number;

  static defaultProps = {
    decimals: 0,
    duration: 2500,
    easeFn: easeOutExpo,
    start: 0,
  };

  constructor(props: Props) {
    super(props);

    const { start, decimals } = this.props;
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

  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'setTimer'.
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

  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'countUp'.
  countUp() {
    const { start, end, duration, decimals } = this.props;

    const time = new Date().getTime() - this.startTime;
    const difference = end - start;

    /* eslint-disable fp/no-let, fp/no-mutation */
    let result;

    if (time < duration) {
      result = this.props
        .easeFn(time, start, difference, duration)
        .toFixed(decimals);
    } else {
      result = end.toFixed(decimals);
      this.clearTimer();
    }
    /* eslint-enable fp/no-let, fp/no-mutation */
    this.setState({ value: result });
  }

  render() {
    return this.props.render(this.state);
  }
}
