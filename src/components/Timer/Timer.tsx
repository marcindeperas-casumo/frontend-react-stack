// @flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
import { PureComponent, type Node } from "react";
import { DateTime } from "luxon";
import { compose, all, gte, values, map, isNil } from "ramda";

type State = {
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
  hasEnded: boolean,
};

type OwnProps = {
    /** The (UTC) time in milliseconds the clock should start at */
    startTime?: number;
    /** The (UTC) time in milliseconds the clock should stop at */
    endTime?: number;
    /** Render prop to display the timer */
    render: (state: State) => Node;
    /** Render prop to display once the timer reaches 0 */
    onEnd: () => Node | null;
};

const greaterThanZero = gte(0);
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
const padTimes = map(time => `${Math.floor(time)}`.padStart(2, "0"));
const UPDATE_INTERVAL = 1000;

const diffTime = time => {
  return (
    DateTime.fromMillis(time)
      // The endTime timestamp should always be UTC. Rather than use diffNow we
      // explictly use DateTime.utc to make sure we don't have to deal with TimeZones
      .diff(DateTime.utc(), ["days", "hours", "minutes", "seconds"])
      .toObject()
  );
};

const toAbsolute = map(Math.abs);

type Props = OwnProps & typeof Timer.defaultProps;

export default class Timer extends PureComponent<Props, State> {
  lastTime: number;
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'updateTime'.
  updateTime: (currentTime: number) => void;
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'AnimationFrameID'.
  interval: AnimationFrameID;

  static defaultProps = {
    onEnd: () => null,
  };

  constructor(props: Props) {
    super(props);
    this.lastTime = 0;
    this.updateTime = this.updateTime.bind(this);
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ [n: number]: string; length: number; toStr... Remove this comment to see the full error message
    this.state = {
      ...padTimes(
        compose(
          toAbsolute,
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          diffTime
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        )(this.props.startTime || this.props.endTime)
      ),
    };
  }

  componentDidMount() {
    this.interval = requestAnimationFrame(this.updateTime);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.interval);
  }

  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'updateTime'.
  updateTime(currentTime: number) {
    if (currentTime >= this.lastTime + UPDATE_INTERVAL) {
      const time = diffTime(this.props.startTime || this.props.endTime);
      const hasEnded =
        !isNil(this.props.endTime) &&
        compose(
          all(greaterThanZero),
          values
        )(time);

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ hasEnded: boolean; length: num... Remove this comment to see the full error message
      this.setState({
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'DurationObject' is not assignabl... Remove this comment to see the full error message
        ...padTimes(toAbsolute(time)),
        hasEnded,
      });

      this.lastTime = currentTime;
    }

    if (this.state.hasEnded) {
      cancelAnimationFrame(this.interval);
    } else {
      this.interval = requestAnimationFrame(this.updateTime);
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
