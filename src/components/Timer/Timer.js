// @flow
import { PureComponent } from "react";
import { DateTime } from "luxon";
import { all, gte, values, map } from "ramda";

type Props = {
  /** The (UTC) time in milliseconds */
  endTime: Date,
  /** Render prop to display the timer */
  render: Function,
  /** Render prop to display once the timer reaches 0 */
  onEnd: Function,
};

type State = {
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
  hasEnded: false,
};

const greaterThanZero = gte(0);

const padTime = map(time => `${Math.floor(time)}`.padStart(2, "0"));

const diffTime = endTime =>
  DateTime.fromMillis(endTime)
    .diff(DateTime.utc(), ["days", "hours", "minutes", "seconds"])
    .toObject();

export default class Timer extends PureComponent<Props, State> {
  lastTime: number;
  updateTime: Function;
  interval: AnimationFrameID;

  constructor(props: Props) {
    super(props);
    this.lastTime = 0;
    this.updateTime = this.updateTime.bind(this);
    this.state = {
      ...padTime(diffTime(this.props.endTime)),
    };
  }

  componentDidMount() {
    this.interval = requestAnimationFrame(this.updateTime);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.interval);
  }

  updateTime(currentTime: number) {
    if (currentTime >= this.lastTime + 1000) {
      const time = diffTime(this.props.endTime);
      const hasEnded = all(greaterThanZero)(values(time));

      this.setState({
        ...padTime(time),
        hasEnded,
      });

      this.lastTime = currentTime;
    }

    if (this.state.hasEnded) {
      cancelAnimationFrame(this.interval);
    } else {
      requestAnimationFrame(this.updateTime);
    }
  }

  renderOnEnd() {
    const { onEnd } = this.props;
    return onEnd();
  }

  renderComponent() {
    const { render } = this.props;
    return render(this.state);
  }

  render() {
    if (this.state.hasEnded) {
      return this.renderOnEnd();
    }
    return this.renderComponent();
  }
}
