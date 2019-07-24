import React from "react";
import { mount, shallow } from "enzyme";
import { omit } from "ramda";
import Card from "@casumo/cmp-card";
import { CuratedCardBackground } from "Components/CuratedCard/CuratedCardBackground";
import { CuratedCard } from "Components/CuratedCard/CuratedCard";
import {
  CuratedCardFooterGame,
  CuratedCardFooterText,
} from "Components/CuratedCard/CuratedCardFooter";
import { CuratedCardSkeleton } from "Components/CuratedCard/CuratedCardSkeleton";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CURATED_TYPE, CARD_CLICK_URL } from "Models/curated";

describe("CuratedCard", () => {
  let fetchCurated;
  let onLaunchGame;
  let curatedCardDataGame;
  let curatedCardDataPromotion;
  let curatedCardDataWelcomeOffer;
  const promotion = ["boosted-reel-races"];

  beforeEach(() => {
    fetchCurated = jest.fn();
    onLaunchGame = jest.fn();
    curatedCardDataGame = { ...curatedData, fetchCurated };
    curatedCardDataPromotion = {
      ...omit(["gameData", "gameId"], curatedData),
      promotion,
      fetchCurated,
      typeOfCurated: CURATED_TYPE.PROMOTION,
    };
    curatedCardDataWelcomeOffer = {
      ...omit(["gameData", "gameId"], curatedData),
      fetchCurated,
      typeOfCurated: CURATED_TYPE.WELCOME_OFFER,
    };
  });

  test("should render CuratedCardSkeleton when isFetched is false", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataGame} isFetched={false} />
    );

    expect(component.find(CuratedCardSkeleton).exists()).toBe(true);
  });

  test("should not render CuratedCardSkeleton when isFetched is true", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataGame} isFetched={true} />
    );

    expect(component.find(CuratedCardSkeleton).exists()).toBe(false);
  });

  test("should render CuratedCardBackground and Card when isFetched is true", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataGame} isFetched={true} />
    );
    expect(component.find(CuratedCardBackground).exists()).toBe(true);
    expect(component.find(Card).exists()).toBe(true);
  });

  test("should render CuratedCardFooterGame if there is a game", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataGame} isFetched={true} />
    );

    expect(component.find(CuratedCardFooterGame).exists()).toBe(true);
  });

  test("should render CuratedCardFooterText if there isn't a game", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataPromotion} isFetched={true} />
    );

    expect(component.find(CuratedCardFooterText).exists()).toBe(true);
  });

  test("should render subtitle html", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataPromotion} isFetched={true} />
    ).render();
    const text = component
      .find("[data-test='curated-card-header-subtitle']")
      .text();

    expect(text).toBe(curatedCardDataPromotion.subtitle);
  });

  test("should render header html", () => {
    const component = mount(
      <CuratedCard {...curatedCardDataGame} isFetched={true} />
    ).render();
    const html = component.find("[data-test='curated-card-header']").html();

    expect(html).toBe(curatedCardDataGame.header);
  });

  test("init fetch if not isFetched", () => {
    shallow(<CuratedCard {...curatedCardDataGame} isFetched={false} />);

    expect(fetchCurated).toHaveBeenCalledTimes(1);
  });

  test("do not initiate fetch if isFetched", () => {
    shallow(<CuratedCard {...curatedCardDataGame} isFetched={true} />);

    expect(fetchCurated).toHaveBeenCalledTimes(0);
  });

  test("should not link to anywhere if it is displaying a game", () => {
    const rendered = mount(
      <CuratedCard
        {...curatedCardDataGame}
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

  test("should link to deposit page if is type welcome offer", () => {
    const rendered = mount(
      <CuratedCard
        {...curatedCardDataWelcomeOffer}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(CARD_CLICK_URL[CURATED_TYPE.WELCOME_OFFER]);
  });

  test("should link to a specific promotion if curated type is promotion", () => {
    const rendered = mount(
      <CuratedCard
        {...curatedCardDataPromotion}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(`/en/promotions/${curatedCardDataPromotion.promotion}`);
  });

  test("should not break if the `promotion` is an empty string", () => {
    const rendered = mount(
      <CuratedCard
        {...curatedCardDataWelcomeOffer}
        promotion={[""]}
        isFetched={true}
      />
    );
    const { href } = rendered
      .find("a")
      .first()
      .props();

    expect(href).toBe(CARD_CLICK_URL[CURATED_TYPE.WELCOME_OFFER]);
  });

  test("should not call onLaunchGame if not game", () => {
    const rendered = mount(
      <CuratedCard
        {...curatedCardDataPromotion}
        isFetched={true}
        onLaunchGame={onLaunchGame}
      />
    );
    const cardBackground = rendered.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(onLaunchGame).toHaveBeenCalledTimes(0);
  });

  test("should call onLaunchGame if curated type is game", () => {
    const gameLaunch = jest.fn();
    const rendered = mount(
      <CuratedCard
        {...curatedCardDataGame}
        isFetched={true}
        onLaunchGame={gameLaunch}
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

  test("should track card click with game data when curated type is game", () => {
    const trackClick = rendered.find("TrackClick").first();

    assertTrackClickData(trackClick, curatedData.typeOfCurated, contentSlug);
  });

  test("should track card click with promo data when curated type is promotion", () => {
    const promotionMock = {
      ...curatedData,
      gameData: null,
      typeOfCurated: CURATED_TYPE.PROMOTION,
    };
    rendered = render(promotionMock);
    const trackClick = rendered.find("TrackClick").first();

    assertTrackClickData(trackClick, promotionMock.typeOfCurated, contentSlug);
  });

  test("should track play button with game data when curated ", () => {
    const playTrackClick = rendered
      .find(CuratedCardFooterGame)
      .find("TrackClick")
      .first();

    assertTrackClickData(
      playTrackClick,
      curatedData.typeOfCurated,
      contentSlug
    );
  });
});
