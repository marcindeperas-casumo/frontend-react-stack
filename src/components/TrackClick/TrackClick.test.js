import React from "react";
import { mount } from "enzyme";
import TrackProvider from "Components/TrackProvider";
import TrackClick from "./TrackClick";

describe("TrackClick", () => {
  const SampleComponent = () => <span>Foo.</span>;
  const eventName = "Foo bar.";
  const contextData = { gameCategory: "latestPlayed" };
  const data = { game: "starburst" };
  let trackHandler;
  let rendered;

  beforeEach(() => {
    trackHandler = jest.fn();
    rendered = mount(
      <TrackProvider data={contextData}>
        <TrackClick
          trackHandler={trackHandler}
          eventName={eventName}
          data={data}
        >
          <SampleComponent />
        </TrackClick>
      </TrackProvider>
    );
  });

  test("renders the children", () => {
    expect(rendered.find("SampleComponent")).toHaveLength(1);
  });

  test("calls the track function on click", () => {
    rendered.find("SampleComponent").simulate("click");

    expect(trackHandler).toHaveBeenCalledTimes(1);
  });

  test("passes the correct props to the tracker function", () => {
    rendered.find("SampleComponent").simulate("click");

    const eventNameArg = trackHandler.mock.calls[0][0];
    const eventDataArg = trackHandler.mock.calls[0][1];

    expect(eventNameArg).toBe(eventName);
    expect(eventDataArg).toMatchObject(contextData);
    expect(eventDataArg).toMatchObject(data);
  });
});
