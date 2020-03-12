import React from "react";
import { shallow } from "enzyme";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { gamesListMock } from "Components/GameListHorizontal/GameListHorizontalDefault/__mock__";

describe("ScrollableListPaginated", () => {
  const itemRenderer = ({ style, columnIndex }) => <p>{columnIndex}</p>;
  const tileHeight = 204;
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ScrollableListPaginated
        title={gamesListMock.name}
        itemCount={gamesListMock.games.length}
        tileHeight={tileHeight}
        seeMore={{
          url: "/aw-gidi",
          text: "Aw gidi",
        }}
        itemRenderer={itemRenderer}
      />
    );
  });

  test("render the list top bar (title and seeMore url)", () => {
    const titleComponent = rendered.find("ScrollableListTitleRow");
    expect(titleComponent.length).toBe(1);
    expect(titleComponent.props().title).toEqual(gamesListMock.name);
  });

  test("render a ScrollablePaginated component", () => {
    expect(rendered.find(ScrollablePaginated).length).toBe(1);
  });

  test("pass tileHeight to ScrollablePaginated", () => {
    expect(rendered.find(ScrollablePaginated).prop("height")).toEqual(
      tileHeight
    );
  });
});
