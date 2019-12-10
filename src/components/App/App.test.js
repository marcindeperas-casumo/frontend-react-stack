import React from "react";
import { shallow, mount } from "enzyme";
import { App } from "./App";

describe("App", () => {
  test("onAppStart is called when the component is mounted", () => {
    const fn = jest.fn();
    mount(
      <App
        onAppStarted={fn}
        routeParams={[]}
        subscribeToUpdates={() => {}}
        unsubscribeToUpdates={() => {}}
      />
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("does not render anything if not isAuthenticated", () => {
    const rendered = shallow(
      <App
        onAppStarted={() => {}}
        isAuthenticated={false}
        subscribeToUpdates={() => {}}
        unsubscribeToUpdates={() => {}}
      />
    );

    expect(rendered.get(0)).toBeNull();
  });

  test("should subscribe on initial load only", () => {
    const subscribeFn = jest.fn();

    mount(
      <App
        onAppStarted={() => {}}
        isAuthenticated={true}
        activeComponents={["foo"]}
        routeParams={[]}
        subscribeToUpdates={subscribeFn}
        unsubscribeToUpdates={() => {}}
        playerId={"123"}
        sessionId={"345"}
      />
    );

    expect(subscribeFn).toHaveBeenCalledTimes(1);
  });
});
