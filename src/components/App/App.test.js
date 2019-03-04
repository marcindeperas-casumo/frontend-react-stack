import React from "react";
import { shallow } from "enzyme";
import App from "Components/App/App";

describe("App", () => {
  test("onAppStart is called when the component is mounted", () => {
    const fn = jest.fn();
    shallow(
      <App
        onAppStarted={fn}
        routeParams={[]}
        subscribeToPlayerUpdates={() => {}}
        unsubscribeToPlayerUpdates={() => {}}
      />
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("does not render anything if not isAuthenticated", () => {
    const rendered = shallow(
      <App
        onAppStarted={() => {}}
        isAuthenticated={false}
        subscribeToPlayerUpdates={() => {}}
        unsubscribeToPlayerUpdates={() => {}}
      />
    );

    expect(rendered.get(0)).toBeNull();
  });

  test("pass activeComponents prop to MigrationComponentManager", () => {
    const rendered = shallow(
      <App
        onAppStarted={() => {}}
        isAuthenticated={true}
        activeComponents={["foo"]}
        routeParams={[]}
        subscribeToPlayerUpdates={() => {}}
        unsubscribeToPlayerUpdates={() => {}}
      />
    );

    expect(rendered.get(0).props.activeKeys).toEqual(["foo"]);
  });
});
