// @flow
import React from "react";
import type { Node } from "react";
import tracker from "Services/tracker";
import { TrackContext } from "Components/TrackProvider";

type Props = {
  children: Node,
  eventName?: string,
  data?: Object,
  trackHandler?: (eventName: string, data: ?Object) => void,
};

export default class TrackClick extends React.PureComponent<Props> {
  static contextType = TrackContext;

  render() {
    const {
      children,
      eventName = "Click",
      data = {},
      trackHandler = tracker.track,
    } = this.props;
    const contextData = this.context;
    const onClick = () => {
      const clickTime = new Date().toISOString();

      trackHandler(eventName, { ...contextData, ...data, clickTime });
    };

    return <div onClick={onClick}>{children}</div>;
  }
}
