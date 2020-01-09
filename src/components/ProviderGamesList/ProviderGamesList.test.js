import React from "react";
import { shallow, mount } from "enzyme";
import ProviderGamesList from "Components/ProviderGamesList/ProviderGamesList";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";

describe("ProviderGamesList", () => {
  test("renders skeleton while loading", () => {
    const rendered = shallow(<ProviderGamesList areGamesLoaded={false} />);
    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("renders error on error message", () => {
    const rendered = shallow(
      <ProviderGamesList error={"Provider doesn't exist"} />
    );
    expect(rendered.find("ErrorMessage")).toHaveLength(1);
  });

  test("calls fetchGames() on mount", () => {
    const mock = jest.fn();
    shallow(<ProviderGamesList fetchGames={mock} />);
    expect(mock).toHaveBeenCalled();
  });

  test("renders provider virtuallist", () => {
    const provider = {
      name: "nyx",
      games: ["bloodsuckers", "easter-island"],
    };

    const rendered = mount(
      <MockStore state={defaultState}>
        <ProviderGamesList provider={provider} areGamesLoaded={true} />
      </MockStore>
    );

    expect(rendered.find("VirtualList")).toHaveLength(1);
  });
});
