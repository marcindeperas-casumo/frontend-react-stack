import React from "react";
import { shallow } from "enzyme";
import TrackView from "./TrackView";

describe.only("<TrackView />", () => {
  const track = jest.fn();
  const trackData = {
    foo: "bar",
  };
  const eventName = "foo";

  let rendered;

  beforeEach(() => {
    shallow(<TrackView trackHandler={track} eventName={eventName} />);
  });

  test("should trigger a track view on render of component", () => {
    expect(track).toHaveBeenCalledTimes(1);
  });

  //   test("should pass the correct information to track handler", () => {
  //       expect
  //   });
});
