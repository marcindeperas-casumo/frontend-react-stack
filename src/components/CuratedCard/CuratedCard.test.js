import React from "react";
import { mount, shallow } from "enzyme";
import { dissoc } from "ramda";
import { CuratedCard } from "Components/CuratedCard/CuratedCard";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CURATED_TYPE } from "Models/curated";

describe("CuratedCard", () => {
  const PROMO_TYPE = CURATED_TYPE.PROMOTION;
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
      <CuratedCard
        {...data}
        typeOfCurated={PROMO_TYPE}
        fetchCurated={fetchCurated}
        isFetched={true}
      />
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
        typeOfCurated={PROMO_TYPE}
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
        typeOfCurated={CURATED_TYPE.GAME}
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
    shallow(
      <CuratedCard
        {...curatedData}
        fetchCurated={fetchCurated}
        isFetched={false}
      />
    );

    expect(fetchCurated).toHaveBeenCalledTimes(1);
  });

  test("not init fetch if isFetched", () => {
    shallow(
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
        typeOfCurated={CURATED_TYPE.GAME}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBeNull();
  });

  test("should link to deposit page if there are no promotions and game set", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedData}
        gameData={null}
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={onLaunchGame}
        typeOfCurated={CURATED_TYPE.WELCOME_OFFER}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe("/en/cash/deposit");
  });

  test("should link to a specific promotion if curated type is promotion", () => {
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
        typeOfCurated={CURATED_TYPE.PROMOTION}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(`/en/promotions/${promotion}`);
  });

  test("should not break if the `promotion` prop is an empty string", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedData}
        gameData={null}
        promotion=""
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={onLaunchGame}
        typeOfCurated={CURATED_TYPE.WELCOME_OFFER}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(`/en/cash/deposit`);
  });

  test("should not call onLaunchGame if not game", () => {
    const gameLaunch = jest.fn();
    const rendered = mount(
      <CuratedCard
        gameData={null}
        promotion=""
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={gameLaunch}
        typeOfCurated={CURATED_TYPE.WELCOME_OFFER}
      />
    );
    const cardBackground = rendered.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(gameLaunch).toHaveBeenCalledTimes(0);
  });

  test("should call onLaunchGame if curated type is game", () => {
    const gameLaunch = jest.fn();

    const rendered = mount(
      <CuratedCard
        gameData={null}
        promotion=""
        fetchCurated={fetchCurated}
        isFetched={true}
        onLaunchGame={gameLaunch}
        typeOfCurated={CURATED_TYPE.GAME}
      />
    );
    const cardBackground = rendered.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(gameLaunch).toHaveBeenCalledTimes(1);
  });
});

describe("Curated card - tracking", () => {
  const curatedSlug = "CURATED";
  const contentSlug = "topwheel-treasures";

  const render = curatedMock => {
    return mount(
      <CuratedCard
        {...curatedMock}
        fetchCurated={fetchCurated}
        isFetched={true}
        curatedSlug={`${curatedSlug}.${contentSlug}`}
      />
    );
  };

  const assertTrackClickData = (trackComponent, type, slug) => {
    const expectedTrackData = {
      type,
      slug,
    };

    const actualTrackData = trackComponent.prop("data");

    expect(expectedTrackData).toEqual(actualTrackData);
  };

  let fetchCurated;
  let rendered;

  beforeEach(() => {
    fetchCurated = jest.fn();

    rendered = render(curatedData);
  });

  test("should track card click with gane data when curated type is game", () => {
    const trackClick = rendered.find("TrackClick").first();

    assertTrackClickData(trackClick, curatedData.typeOfCurated, contentSlug);
  });

  test("should track card click with promo data when curated type is promotion", () => {
    const promotionMock = dissoc("gameData", curatedData);
    rendered = render(promotionMock);
    const trackClick = rendered.find("TrackClick").first();

    assertTrackClickData(trackClick, promotionMock.typeOfCurated, contentSlug);
  });

  test("should track play button with game data when curated ", () => {
    const playTrackClick = rendered
      .find("CuratedCardFooter")
      .find("TrackClick")
      .first();

    assertTrackClickData(
      playTrackClick,
      curatedData.typeOfCurated,
      contentSlug
    );
  });
});
