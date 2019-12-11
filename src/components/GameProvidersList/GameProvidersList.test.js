// @flow
import * as React from "react";
import { mount } from "enzyme";
import * as R from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import ScrollableListTitle from "Components/ScrollableListTitle";
import GameProvidersList from "Components/GameProvidersList/GameProvidersList";
import GameProvidersListSkeleton from "Components/GameProvidersList/GameProvidersListSkeleton";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import GameProviderAvatar from "./GameProviderAvatar";

const items = R.times(
  i => ({
    id: `${i}`,
    url: `casumo.es/game/${i}`,
    logo:
      "https://cms.casumo.com/wp-content/uploads/2016/05/live-roulette-bg.jpg",
    background:
      "https://cms.casumo.com/wp-content/uploads/2016/05/live-roulette-logo.png",
  }),
  4
);
const title = "Foo";

describe("<GameProvidersList /> - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList
          isLoaded={true}
          items={items}
          title="I'm a cute title"
        />
      </MockStore>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });

  test("should render skeleton while loading", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList isLoaded={false} title={title} />
      </MockStore>
    );

    expect(rendered.find(GameProvidersListSkeleton)).toHaveLength(1);
  });

  test("shouldn't render unless there are items", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList isLoaded={true} items={[]} title={title} />
      </MockStore>
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("should call the fetch function after mounting", () => {
    const fetch = jest.fn();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList fetch={fetch} title={title} />
      </MockStore>
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should render title and items", () => {
    const item = {
      id: "1",
      url: "url1",
      logo: "logo1",
      background: "background1",
    };
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList items={[item]} isLoaded={true} title={title} />
      </MockStore>
    );

    expect(rendered.find(ScrollableListTitle)).toHaveLength(1);
    expect(rendered.find(ScrollableListTitle).prop("title")).toBe(title);
    expect(rendered.find(Scrollable).find(GameProviderAvatar)).toHaveLength(1);

    const avatar = rendered
      .find(Scrollable)
      .find(GameProviderAvatar)
      .first();

    expect(avatar.prop("url")).toBe(item.url);
    expect(avatar.prop("logo")).toBe(item.logo);
    expect(avatar.prop("background")).toBe(item.background);
  });
});

describe("<GameProvidersList /> - Desktop", () => {
  let rendered;

  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList isLoaded={true} items={items} title={title} />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
  });

  //eslint-disable-next-line sonarjs/no-identical-functions
  test("should render skeleton while loading", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList isLoaded={false} title={title} />
      </MockStore>
    );

    expect(rendered.find(GameProvidersListSkeleton)).toHaveLength(1);
  });

  //eslint-disable-next-line sonarjs/no-identical-functions
  test("shouldn't render unless there are items", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameProvidersList isLoaded={true} items={[]} title={title} />
      </MockStore>
    );
    expect(rendered.isEmptyRender()).toBe(true);
  });
});
