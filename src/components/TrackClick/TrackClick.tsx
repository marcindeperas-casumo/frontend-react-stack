// @flow
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
import type { Node } from "react";
import tracker from "Services/tracker";
import { TrackContext } from "Components/TrackProvider";

type Props = {
  children: Node,
  eventName?: string,
  data?: Object,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  trackHandler?: (eventName: string, data: ?Object) => void,
  className?: string,
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
