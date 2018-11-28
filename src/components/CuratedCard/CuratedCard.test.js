import React from "react";
import { mount, shallow } from "enzyme";
import { dissoc } from "ramda";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import curatedData from "Models/curated/__mocks__/curated.json";

describe("CuratedCard", () => {
  let fetchCurated;

  beforeEach(() => {
    fetchCurated = jest.fn();
  });

  test("should render component", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );

    expect(component.find("CuratedCard").exists()).toBe(true);
  });

  test("should render CuratedCardSkeleton when isFetched is false", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );

    expect(component.find("CuratedCardSkeleton").exists()).toBe(true);
  });

  test("should render CuratedCard when isFetched", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("CuratedCardBackground").exists()).toBe(true);
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render component", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );
    expect(component.find("CuratedCard").exists()).toBe(true);
  });

  test("should render ImageLazy background", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("ImageLazy").exists()).toBe(true);
  });

  test("should render Card", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render CuratedCardFooter if there is a game", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(component.find("CuratedCardFooter").exists()).toBe(true);
  });

  test("should render promotions_legal_text if no game", () => {
    const data = dissoc("gameData", curatedData);
    const component = mount(
      <CuratedCard {...data} fetchCurated={fetchCurated} isFetched={true} />
    );
    const text = component
      .find("Card")
      .find("Text")
      .last()
      .text();
    expect(text).toBe(data.promotions_legal_text);
  });

  test("should render subtitle html", () => {
    const data = dissoc("gameData", curatedData);
    const promoData = dissoc("gameId", data);
    const component = mount(
      <CuratedCard
        {...promoData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    const text = component
      .find("Card")
      .find("Text")
      .at(0)
      .render()
      .text();
    expect(text).toBe("PROMOTIONS");
  });

  test("should render header html", () => {
    const component = mount(
      <CuratedCard
        {...curatedData}
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
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );
    expect(fetchCurated).toHaveBeenCalledTimes(1);
  });

  test("not init fetch if isFetched", () => {
    const component = shallow(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
    );
    expect(fetchCurated).toHaveBeenCalledTimes(0);
  });

  test("should not link to anywhere if it is displaying a game", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBeNull();
  });

  test("should link to promotions if there are no promotions and game set", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedData}
        gameData={null}
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe("/en/promotions");
  });

  test("should link to a specific promotion if it is set", () => {
    const promotion = "boosted-reel-races";
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedData}
        gameData={null}
        promotion={[promotion]}
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(`/en/promotions/${promotion}`);
  });

  test("should not break if the `promotion` prop is an emty string", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedData}
        gameData={null}
        promotion=""
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(`/en/promotions`);
  });
});
