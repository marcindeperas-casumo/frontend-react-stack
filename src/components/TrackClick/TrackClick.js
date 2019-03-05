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
    if (process.env.NODE_ENV === "development" && !contextData.location) {
      /**
       * This location comes from context, you should have:
       *
       * import { EVENT_PROPS } from "Src/constants";
       * import TrackProvider from "Components/TrackProvider";
       * (...)
       * <TrackProvider data={{ [EVENT_PROPS.LOCATION]: "your location">(...)</TrackProvider>
       *
       * somewhere higher in the component tree!
       */
      console.error("Location is missing on event! Component should be wrapped around a <TrackProvider data={{ [EVENT_PROPS.LOCATION]: "your location">(...)</TrackProvider>");
    }
    const onClick = () => trackHandler(eventName, { ...contextData, ...data });

    return <div onClick={onClick}>{children}</div>;
  }
}
