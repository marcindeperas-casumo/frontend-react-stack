// @flow
import React from "react";
import { shallow } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { games } from "./__mocks__";
import { ProviderGamesList } from "./ProviderGamesList";

describe("ProviderGamesList", () => {
  describe("renders skeleton while loading", () => {
    test("mobile", () => {
      setMobileViewport();
      const rendered = shallow(
        <ProviderGamesList
          loading={true}
          games={[]}
          gamesCount={0}
          onLoadMore={() => Promise.resolve(true)}
        />
      );
      expect(rendered.find("ProviderGamesListSkeleton")).toHaveLength(1);
    });

    test("desktop", () => {
      setDesktopViewport();
      const rendered = shallow(
        <ProviderGamesList
          loading={true}
          games={[]}
          gamesCount={0}
          onLoadMore={() => Promise.resolve(true)}
        />
      );
      expect(rendered.find("GamesVirtualGridSkeleton")).toHaveLength(1);
    });
  });

  describe("renders a virtual list with the games if not loading", () => {
    test("mobile", () => {
      setMobileViewport();
      const rendered = shallow(
        <ProviderGamesList
          loading={false}
          games={games}
          gamesCount={games.length}
          onLoadMore={() => Promise.resolve(true)}
        />
      );
      expect(rendered.find("VirtualList")).toHaveLength(1);
    });

    test("desktop", () => {
      setDesktopViewport();
      const rendered = shallow(
        <ProviderGamesList
          loading={false}
          games={games}
          gamesCount={games.length}
          onLoadMore={() => Promise.resolve(true)}
        />
      );
      expect(rendered.find("GamesVirtualGrid")).toHaveLength(1);
    });
  });
});
