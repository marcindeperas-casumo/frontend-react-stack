import React from "react";
import { mount } from "enzyme";
import Card from "@casumo/cmp-card";
import {
  CuratedCardFooterGame,
  CuratedCardFooterText,
} from "../CuratedCardFooter";
import { CuratedCardBackground } from "../CuratedCardBackground";
import { CuratedCard } from "../CuratedCard";
import {
  CuratedCardHeaderSimple,
  CuratedCardHeaderWithSubtitle,
} from "../CuratedCardHeader";
import {
  curatedGameMock,
  curatedPromotionMock,
  curatedSportsMock,
  curatedSportsDepositMock,
} from "../__mocks__";

describe("CuratedCard", () => {
  let onLaunchGame;
  let navigateToSportsHash;
  let navigateById;

  beforeEach(() => {
    onLaunchGame = jest.fn();
    navigateToSportsHash = jest.fn();
    navigateById = jest.fn();
  });

  test("should render nothing if curated-card is not defined", () => {
    const component = mount(<CuratedCard curatedCard={null} />);

    expect(component.isEmptyRender()).toBe(true);
  });

  test("should render CuratedCardBackground and Card", () => {
    const component = mount(<CuratedCard curatedCard={curatedGameMock} />);

    expect(component.find(CuratedCardBackground).exists()).toBe(true);
    expect(component.find(Card).exists()).toBe(true);
  });

  test("should render CuratedCardFooterGame if there is a game", () => {
    const component = mount(<CuratedCard curatedCard={curatedGameMock} />);

    expect(component.find(CuratedCardFooterGame).exists()).toBe(true);
    expect(component.find(CuratedCardFooterText).exists()).toBe(false);
  });

  test("should render CuratedCardFooterText if it is a promotion", () => {
    const component = mount(<CuratedCard curatedCard={curatedPromotionMock} />);

    expect(component.find(CuratedCardFooterText).exists()).toBe(true);
    expect(component.find(CuratedCardFooterGame).exists()).toBe(false);
  });

  test("should render the header with a subtitle if it is a promotion", () => {
    const component = mount(<CuratedCard curatedCard={curatedPromotionMock} />);

    expect(component.find(CuratedCardHeaderWithSubtitle)).toHaveLength(1);
  });

  test("should render the simple header if it is a game", () => {
    const component = mount(<CuratedCard curatedCard={curatedGameMock} />);

    expect(component.find(CuratedCardHeaderSimple)).toHaveLength(1);
  });

  test("should not render a header if the data is missing", () => {
    const component = mount(
      <CuratedCard curatedCard={{ ...curatedGameMock, header: null }} />
    );

    expect(component.find(CuratedCardHeaderSimple)).toHaveLength(0);
  });

  test("should not link to anywhere if it is displaying a game", () => {
    const component = mount(<CuratedCard curatedCard={curatedGameMock} />);

    const { href } = component
      .find("a")
      .first()
      .props();

    expect(href).toBeNull();
  });

  test("should link to a specific promotion if curated type is promotion", () => {
    const component = mount(<CuratedCard curatedCard={curatedPromotionMock} />);

    const { href } = component
      .find("a")
      .first()
      .props();

    expect(href).toBe(`/promotions/${curatedPromotionMock.promotionSlug}`);
  });

  test("should not call onLaunchGame if not game", () => {
    const component = mount(
      <CuratedCard
        onLaunchGame={onLaunchGame}
        curatedCard={curatedPromotionMock}
      />
    );
    const cardBackground = component.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(onLaunchGame).toHaveBeenCalledTimes(0);
  });

  test("should call onLaunchGame if curated type is game", () => {
    const component = mount(
      <CuratedCard onLaunchGame={onLaunchGame} curatedCard={curatedGameMock} />
    );
    const cardBackground = component.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(onLaunchGame).toHaveBeenCalledTimes(1);
  });

  test("should call navigateToSportsHash if curated type is SPORTS", () => {
    const component = mount(
      <CuratedCard
        onLaunchGame={onLaunchGame}
        navigateToSportsHash={navigateToSportsHash}
        curatedCard={curatedSportsMock}
      />
    );
    const cardBackground = component.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(navigateToSportsHash).toHaveBeenCalledTimes(1);
  });

  test("should call navigateById if curated type is SPORTS and deposit link", () => {
    const component = mount(
      <CuratedCard
        onLaunchGame={onLaunchGame}
        navigateToSportsHash={navigateToSportsHash}
        navigateById={navigateById}
        curatedCard={curatedSportsDepositMock}
      />
    );
    const cardBackground = component.find("CuratedCardBackground");

    cardBackground.simulate("click");

    expect(navigateById).toHaveBeenCalledTimes(1);
  });
});
