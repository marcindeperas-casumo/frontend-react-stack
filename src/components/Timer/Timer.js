// @flow
import { PureComponent, type Node } from "react";
import { DateTime } from "luxon";
import { compose, all, gte, values, map } from "ramda";

type State = {
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
  hasEnded: boolean,
};

type Props = {
  /** The (UTC) time in milliseconds */
  endTime: Date | number,
  /** Render prop to display the timer */
  render: (state: State) => Node,
  /** Render prop to display once the timer reaches 0 */
  onEnd: () => Node,
};

const greaterThanZero = gte(0);
const padTimes = map(time => `${Math.floor(time)}`.padStart(2, "0"));
const UPDATE_INTERVAL = 1000;

const diffTime = endTime => {
  return (
    DateTime.fromMillis(endTime)
      // The endTime timestamp should always be UTC. Rather than use diffNow we
      // explictly use DateTime.utc to make sure we don't have to deal with TimeZones
      .diff(DateTime.utc(), ["days", "hours", "minutes", "seconds"])
      .toObject()
  );
};

export default class Timer extends PureComponent<Props, State> {
  lastTime: number;
  updateTime: (currentTime: number) => void;
  interval: AnimationFrameID;

  constructor(props: Props) {
    super(props);
    this.lastTime = 0;
    this.updateTime = this.updateTime.bind(this);
    this.state = {
      ...padTimes(diffTime(this.props.endTime)),
    };
  }

  componentDidMount() {
    this.interval = requestAnimationFrame(this.updateTime);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.interval);
  }

  updateTime(currentTime: number) {
    if (currentTime >= this.lastTime + UPDATE_INTERVAL) {
      const time = diffTime(this.props.endTime);
      const hasEnded = compose(
        all(greaterThanZero),
        values
      )(time);

      this.setState({
        ...padTimes(time),
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
