import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Router } from "Components/Router";
import { createReduxStore } from "Services/reduxStore";
import defaultState from "Models/__mocks__/state.mock";
import { App } from "./App";

const store = createReduxStore(defaultState);

describe("App", () => {
  test("onAppStart is called when the component is mounted", () => {
    // MockProvider could not be used here as MockedProvider
    // from apollo seems to block the rendering of child components
    const fn = jest.fn();
    mount(
      <Provider store={store}>
        <App
          onAppStarted={fn}
          subscribeToUpdates={() => {}}
          unsubscribeToUpdates={() => {}}
        />
      </Provider>
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("does not render anything if not isAuthenticated", () => {
    // MockProvider could not be used here as MockedProvider
    // from apollo seems to block the rendering of child components
    const rendered = mount(
      <Provider store={store}>
        <App
          isAppHandshakeLoaded={true}
          onAppStarted={() => {}}
          isAuthenticated={false}
          subscribeToUpdates={() => {}}
          unsubscribeToUpdates={() => {}}
        />
      </Provider>
    );

    expect(rendered.find(Router)).toHaveLength(0);
  });

  test("does not render anything if app handshake is not loaded", () => {
    // MockProvider could not be used here as MockedProvider
    // from apollo seems to block the rendering of child components
    const rendered = mount(
      <Provider store={store}>
        <App
          isAppHandshakeLoaded={false}
          onAppStarted={() => {}}
          isAuthenticated={true}
          subscribeToUpdates={() => {}}
          unsubscribeToUpdates={() => {}}
        />
      </Provider>
    );

    expect(rendered.find(Router)).toHaveLength(0);
  });

  test("should subscribe on initial load only", () => {
    // MockProvider could not be used here as MockedProvider
    // from apollo seems to block the rendering of child components
    const subscribeFn = jest.fn();

    mount(
      <Provider store={store}>
        <App
          onAppStarted={() => {}}
          isAuthenticated={true}
          activeComponents={["foo"]}
          subscribeToUpdates={subscribeFn}
          unsubscribeToUpdates={() => {}}
          playerId={"123"}
          sessionId={"345"}
        />
      </Provider>
    );

    expect(subscribeFn).toHaveBeenCalledTimes(1);
  });
});
