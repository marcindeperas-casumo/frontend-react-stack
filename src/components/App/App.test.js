import React from "react";
import { shallow, mount } from "enzyme";
import { MARKETS, LANGUAGES, URL_PREFIXES } from "Src/constants";
import { Router } from "Components/Router";
import { App } from "./App";

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

  test("should subscribe on initial load only", () => {
    const subscribeFn = jest.fn();

    shallow(
      <App
        onAppStarted={() => {}}
        isAuthenticated={true}
        activeComponents={["foo"]}
        routeParams={[]}
        subscribeToPlayerUpdates={subscribeFn}
        unsubscribeToPlayerUpdates={() => {}}
      />
    );

    expect(subscribeFn).toHaveBeenCalledTimes(1);
  });

  Object.values(MARKETS).forEach(market => {
    const marketLanguage = LANGUAGES[market];
    const marketUrlPrefix = URL_PREFIXES[market];

    test(`should pass '${marketUrlPrefix}' as basePath and '${marketLanguage}' as language to Router for ${market}`, () => {
      const rendered = mount(
        <App
          onAppStarted={() => {}}
          isAuthenticated={true}
          subscribeToPlayerUpdates={() => {}}
          unsubscribeToPlayerUpdates={() => {}}
          market={market}
          language={marketLanguage}
        />
      );
      const { basePath, language } = rendered.find(Router).props();

      expect(basePath).toBe(marketUrlPrefix);
      expect(language).toBe(marketLanguage);
    });
  });
});
