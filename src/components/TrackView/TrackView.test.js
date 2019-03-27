import React from "react";
import { shallow } from "enzyme";
import TrackView from "./TrackView";

describe("<TrackView />", () => {
  const track = jest.fn();
  const trackData = {
    foo: "bar",
  };
  const eventName = "foo";

  beforeEach(() => {
    shallow(
      <TrackView trackHandler={track} eventName={eventName} data={trackData} />
    );
  });

  test("should trigger a track view on render of component", () => {
    expect(track).toHaveBeenCalledTimes(1);
  });

  test("should pass the correct information to track handler", () => {
    const actualTrackEventName = track.mock.calls[0][0];
    const actualTrackData = track.mock.calls[0][1];

    expect(actualTrackEventName).toEqual(eventName);
    expect(actualTrackData).toEqual(trackData);
  });
});
