import React from "react";
import tracker from "Services/tracker";

export type Props = {
  eventName?: string;
  data?: Object;
  trackHandler?: (eventName: string, data: Object) => void | undefined;
};

export default class TrackView extends React.PureComponent<Props> {
  trackView = () => {
    const contextData = this.context as Object;
    const {
      eventName = "View",
      data = {},
      trackHandler = tracker.track,
    } = this.props;

    trackHandler(eventName, {
      ...contextData,
      ...data,
    });
  };

  componentDidMount() {
    this.trackView();
  }

  render() {
    return null;
  }
}
