// @flow
import React from "react";
import tracker from "Services/tracker";

export type Props = {
  eventName?: string,
  data?: Object,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  trackHandler?: (eventName: string, data: ?Object) => void,
};

export default class TrackView extends React.PureComponent<Props> {
  trackView = () => {
    const contextData = this.context;
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
