import React from "react";
import tracker from "Services/tracker";
import { TrackContext } from "Components/TrackProvider";

type Props = {
  children: React.ReactChild;
  eventName?: string;
  data?: Object;
  trackHandler?: (eventName: string, data: Object) => void | undefined;
  className?: string;
};

export default class TrackClick extends React.PureComponent<Props> {
  static contextType = TrackContext;

  render() {
    const {
      children,
      eventName = "Click",
      data = {},
      trackHandler = tracker.track,
      className = "",
    } = this.props;
    const contextData = this.context;
    const onClick = () => trackHandler(eventName, { ...contextData, ...data });

    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }
}
