import React from "react";
import { shallow } from "enzyme";
import TileListHorizontal from "Components/TileListHorizontal/TileListHorizontal";

describe("TileListHorizontal", () => {
  test("should render skeleton while loading", () => {
    const rendered = shallow(<TileListHorizontal isLoaded={false} />);
    expect(rendered.find("TileListHorizontalSkeleton")).toHaveLength(1);
  });

  test("shouldn't render unless there are items", () => {
    const rendered = shallow(<TileListHorizontal isLoaded={true} items={[]} />);
    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("should call the fetch function after mounting", () => {
    const fetch = jest.fn();
    shallow(<TileListHorizontal fetch={fetch} />);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should render title and items", () => {
    const title = "Foo";
    const item = {
      url: "url1",
      logo: "logo1",
      background: "background1",
    };
    const rendered = shallow(
      <TileListHorizontal title={title} items={[item]} isLoaded={true} />
    );

    expect(rendered.find("ScrollableListTitle")).toHaveLength(1);
    expect(rendered.find("ScrollableListTitle").prop("title")).toBe(title);
    expect(rendered.find("Scrollable").find("Tile")).toHaveLength(1);

    const tile = rendered
      .find("Scrollable")
      .find("Tile")
      .first();

    expect(tile.prop("url")).toBe(item.url);
    expect(tile.prop("logo")).toBe(item.logo);
    expect(tile.prop("background")).toBe(item.background);
  });
});
