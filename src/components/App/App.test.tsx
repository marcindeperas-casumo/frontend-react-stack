import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { Router } from "Components/Router";
import { createReduxStore } from "Services/reduxStore";
import defaultState from "Models/__mocks__/state.mock";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_LOGIN } from "Src/constants";
import { App } from "./App";
import { AppLoS } from "./AppLoS";
import { AppLiS } from "./AppLiS";

const store = createReduxStore(defaultState);

describe("App", () => {
  test("onAppStart is called when the component is mounted", () => {
    const fn = jest.fn();
    mount(
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2740) FIXME: Type '{ onAppStarted: Mock<any, any>; }' is missin... Remove this comment to see the full error message */}
        <App onAppStarted={fn} />
      </Provider>
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("does not render anything if app handshake is not loaded", () => {
    const rendered = mount(
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2740) FIXME: Type '{ onAppStarted: () => void; }' is missing th... Remove this comment to see the full error message */}
        <App onAppStarted={() => {}} />
      </Provider>
    );
    expect(rendered.find(Router)).toHaveLength(0);
  });

  test("should subscribe on initial load only", () => {
    const subscribeFn = jest.fn();

    mount(
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ onAppStarted: () => void; subscribeToUpdat... Remove this comment to see the full error message */}
        <App
          onAppStarted={() => {}}
          subscribeToUpdates={subscribeFn}
          playerId={"123"}
          sessionId={"345"}
        />
      </Provider>
    );
    expect(subscribeFn).toHaveBeenCalledTimes(1);
  });

  test("renders <AppLoS /> if not isAuthenticated", () => {
    const rendered = mount(
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ onAppStarted: () => void; isAppHandshakeLo... Remove this comment to see the full error message */}
        <App onAppStarted={() => {}} isAppHandshakeLoaded />
      </Provider>
    );
    expect(rendered.find(AppLoS)).toHaveLength(1);
  });

  test("renders <AppLiS /> if isAuthenticated", () => {
    const rendered = mount(
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ onAppStarted: () => void; isAppHandshakeLo... Remove this comment to see the full error message */}
        <App
          onAppStarted={() => {}}
          isAppHandshakeLoaded
          isAuthenticatedHandshake
        />
      </Provider>
    );
    expect(rendered.find(AppLiS)).toHaveLength(1);
  });

  test("bridge on Log in event calls onAppStarted, sets isAuthenticated true and renders <AppLiS />", () => {
    const fn = jest.fn();
    const rendered = mount(
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ onAppStarted: Mock<any, any>; isAppHandsha... Remove this comment to see the full error message */}
        <App onAppStarted={fn} isAppHandshakeLoaded />
      </Provider>
    );

    act(() => bridge.emit(REACT_APP_EVENT_ON_LOGIN, {}));
    rendered.update();

    expect(fn).toHaveBeenCalledTimes(2);
    expect(rendered.find(AppLiS)).toHaveLength(1);
  });
});
