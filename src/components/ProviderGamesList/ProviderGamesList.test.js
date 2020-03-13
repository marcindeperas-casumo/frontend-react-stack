// @flow
import React from "react";
import { shallow } from "enzyme";
import { games } from "./__mocks__";
import { ProviderGamesList } from "./ProviderGamesList";

describe("ProviderGamesList", () => {
  test("renders skeleton while loading", () => {
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

  test("renders a virtual list with the games if not loading", () => {
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
});
