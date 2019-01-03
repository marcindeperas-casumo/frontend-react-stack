import React from "react";
import { shallow } from "enzyme";
import TrackProvider from "./TrackProvider";

describe("<TrackProvider>", () => {
  const SampleComponent = () => <span>Foo.</span>;
  const data = { foo: "bar" };
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <TrackProvider data={data}>
        <SampleComponent />
      </TrackProvider>
    );
  });

  test("renders a context provider", () => {
    expect(rendered.find("ContextProvider")).toHaveLength(1);
  });

  test("sets the data on the context provider", () => {
    const provider = rendered.find("ContextProvider");

    expect(provider.props().value).toEqual(data);
  });

  test("renders out the children", () => {
    expect(rendered.find("SampleComponent")).toHaveLength(1);
  });
});
