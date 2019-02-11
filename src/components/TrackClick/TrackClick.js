// @flow
import React from "react";
import type { Node } from "react";
import { track } from "Services/tracker";
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
      trackHandler = track,
    } = this.props;
    const contextData = this.context;
    const onClick = () => trackHandler(eventName, { ...contextData, ...data });

    return <div onClick={onClick}>{children}</div>;
  }
}
