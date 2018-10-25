import React from "react";
import { mount } from "enzyme";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import curatedData from "Reducers/curated/__mocks__/curated.json";

describe("CuratedCard", () => {
  const fetchCurated = jest.fn();
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
    const data = { ...curatedData, game: [] };
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
    const fetchCurated = jest.fn();

    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );
    expect(fetchCurated).toHaveBeenCalledTimes(1);
  });

  test("not init fetch if isFetched", () => {
    const fetchCurated = jest.fn();

    const component = mount(
      <CuratedCard
        data={curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(fetchCurated).toHaveBeenCalledTimes(0);
  });
});
