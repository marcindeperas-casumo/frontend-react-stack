import React from "react";
import { mount, shallow } from "enzyme";
import { dissoc } from "ramda";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import curatedData from "Reducers/curated/__mocks__/curated.json";

describe("CuratedCard", () => {
  let fetchCurated;

  beforeEach(() => {
    fetchCurated = jest.fn();
  });

  test("should render component", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );

    expect(component.find("CuratedCard").exists()).toBe(true);
  });

  test("should render CuratedCardSkeleton when isFetched is false", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );

    expect(component.find("CuratedCardSkeleton").exists()).toBe(true);
  });

  test("should render CuratedCard when isFetched", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("CuratedCardBackground").exists()).toBe(true);
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render component", () => {
    const component = mount(
      <CuratedCard data={{}} fetchCurated={fetchCurated} isFetched={false} />
    );
    expect(component.find("CuratedCard").exists()).toBe(true);
  });

  test("should render ImageLazy background", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("ImageLazy").exists()).toBe(true);
  });

  test("should render Card", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render CuratedCardFooter if there is a game", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("CuratedCardFooter").exists()).toBe(true);
  });

  test("should render promotions_legal_text if no game", () => {
    const data = dissoc("gameData", { ...curatedData, game: [] });
    const component = mount(
      <CuratedCard data={data} fetchCurated={fetchCurated} isFetched={true} />
    );
    const text = component
      .find("Card")
      .find("Text")
      .last()
      .text();
    expect(text).toBe(data.promotions_legal_text);
  });

  test("should render header html", () => {
    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    const html = component
      .find("Card")
      .find("Text")
      .at(0)
      .render()
      .html();
    expect(html).toBe("TRY OUR<br> NEW<br> GAME");
  });

  test("init fetch if not isFetched", () => {
    const component = shallow(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );
    expect(fetchCurated).toHaveBeenCalledTimes(1);
  });

  test("not init fetch if isFetched", () => {
    const component = shallow(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(fetchCurated).toHaveBeenCalledTimes(0);
  });
});
