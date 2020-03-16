// @flow
import React from "react";
import { mount } from "enzyme";
import ScrollableList from "Components/ScrollableList";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import { ReelRacesList } from "./ReelRacesList";

const props = {
  isFetched: false,
  areTranslationsFetched: true,
  title: "Reel Race",
  seeMore: "See more",
  reelRaces: [
    {
      id: "edc71c70-56d6-11e9-8587-0242ac11000b",
      startTime: 1580882400000,
      optedIn: false,
      endTime: 1580883600000,
      spinLimit: 140,
      minBet: null,
      promoted: false,
      formattedPrize: "€20",
      remainingSpins: 99,
      game: {
        id: "fa9aa550-6be1-11e4-a1d6-005056a03af2",
        name: "Jack and the Beanstalk",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2014/02/JackOfTheBeanstalk_Logo.png",
        backgroundImage:
          "https://cms.casumo.com/wp-content/uploads/2014/06/JackOfTheBeanstalk_Thumb.jpg",
        slug: "jack-the-beanstalk",
      },
      translations: {
        optedInCtaSingleGameShort: "Play",
        optIn: "Opt in",
        optedIn: "Opted in",
        endingIn: "Ending in",
        startingIn: "Starting in:",
        competeFor: "Compete for {{prize}}",
        spins: "Spins",
        duration: "Duration",
        durationTemplate: "{{{duration}}} min",
        minBet: "Min Bet",
        caveatShort: "false",
      },
    },
    {
      id: "c21ee900-560d-11e9-8587-0242ac11000b",
      startTime: 1580882400000,
      optedIn: false,
      endTime: 1580883600000,
      spinLimit: 140,
      minBet: null,
      promoted: false,
      formattedPrize: "€20",
      remainingSpins: 99,
      game: {
        id: "789f90f0-4181-11e8-9251-0242ac110002",
        name: "Wild Heist at Peacock Manor",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2018/04/wild_heist_logo.png",
        backgroundImage:
          "https://cms.casumo.com/wp-content/uploads/2018/04/wild_heist_thumbnail.jpg",
        slug: "wild-heist-at-peacock-manor",
      },
      translations: {
        optedInCtaSingleGameShort: "Play",
        optIn: "Opt in",
        optedIn: "Opted in",
        endingIn: "Ending in",
        startingIn: "Starting in:",
        competeFor: "Compete for {{prize}}",
        spins: "Spins",
        duration: "Duration",
        durationTemplate: "{{{duration}}} min",
        minBet: "Min Bet",
        caveatShort: "false",
      },
    },
  ],
};

describe("<ReelRacesList /> - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    jest.clearAllMocks();
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <ReelRacesList {...props} />
      </MockStore>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(0);
  });

  test("renders a ScrollableList", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(1);
  });

  test("passes the list title to the ScrollableList", () => {
    const { title } = rendered.find("ScrollableList").props();

    expect(title).toBe(props.title);
  });

  test("passes the games to the ScrollableList", () => {
    const { items } = rendered.find("ScrollableList").props();

    expect(items).toBe(props.reelRaces);
  });
});

describe("<ReelRacesList /> - Desktop", () => {
  let rendered;

  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <ReelRacesList {...props} />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(1);
  });

  test("doesn't render a ScrollableList", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(0);
  });
});
