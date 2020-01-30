import React from "react";
import { shallow } from "enzyme";
import { MustDropJackpotsWidget } from "./MustDropJackpotsWidget";
import jackpots from "./__mocks__/jackpots.json";

describe("MustDropJackpotsWidget", () => {
  test("should render an a tag with a MustDropJackpot for each jackpot", () => {
    const fetchJackpots = jest.fn();
    const fetchCmsContent = jest.fn();
    const subscribe = jest.fn();
    const rendered = shallow(
      <MustDropJackpotsWidget
        isFetched={true}
        fetchJackpots={fetchJackpots}
        fetchCmsContent={fetchCmsContent}
        subscribeToUpdates={subscribe}
        jackpots={jackpots}
      />
    );
    expect(rendered.find("a").prop("href")).toBe(
      "/en/games/must-drop-jackpots"
    );
    expect(rendered.find("MustDropJackpot").length).toBe(jackpots.length);
    expect(subscribe).toBeCalledTimes(1);
  });

  test("should call fetch and fetchContent on component did mount", () => {
    const fetchJackpots = jest.fn();
    const fetchCmsContent = jest.fn();
    const subscribe = jest.fn();
    const rendered = shallow(
      <MustDropJackpotsWidget
        isFetched={false}
        fetchJackpots={fetchJackpots}
        fetchCmsContent={fetchCmsContent}
        subscribeToUpdates={subscribe}
        jackpots={jackpots}
      />
    );
    expect(rendered.find("MustDropJackpotsWidgetSkeleton").length).toBe(1);
    expect(fetchJackpots).toBeCalledTimes(1);
    expect(fetchCmsContent).toBeCalledTimes(1);
    expect(subscribe).toBeCalledTimes(1);
  });
});
