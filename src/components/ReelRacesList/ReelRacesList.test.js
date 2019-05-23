// @flow
import React from "react";
import { shallow } from "enzyme";
import ScrollableList from "Components/ScrollableList";
import { ReelRacesList } from "./ReelRacesList";

const props = {
  isFetched: false,
  fetchReelRaces: jest.fn(),
  fetchTranslations: jest.fn(),
  subscribeReelRacesUpdates: jest.fn(),
  unsubscribeReelRacesUpdates: jest.fn(),
  areTranslationsFetched: true,
  reelRacesIds: ["1", "2", "3", "a"],
  t: {
    more_link: "more_link",
    spins: "spins",
    duration: "duration",
    duration_template: "duration_template",
    min_bet: "min_bet",
    starting_in: "starting_in",
    ending_in: "ending_in",
    opt_in: "opt_in",
    opted_in: "opted_in",
    opted_in_cta_single_game_short: "opted_in_cta_single_game_short",
    compete_for: "compete_for",
    title: "title",
    caveat_short: "false",
  },
};

describe("ReelRacesList", () => {
  let rendered;

  beforeEach(() => {
    jest.clearAllMocks();
    rendered = shallow(<ReelRacesList {...props} />);
  });

  test("renders a ScrollableList", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(1);
  });

  test("passes the list title to the ScrollableList", () => {
    const { title } = rendered.find("ScrollableList").props();

    expect(title).toBe(props.t.title);
  });

  test("passes the game-ids to the ScrollableList", () => {
    const { itemIds } = rendered.find("ScrollableList").props();

    expect(itemIds).toBe(props.reelRacesIds);
  });

  test("only fetches reel races data once", () => {
    const { fetchReelRaces } = props;

    expect(fetchReelRaces).toBeCalledTimes(1);

    // eslint-disable-next-line no-unused-vars
    const rendered_again = shallow(<ReelRacesList {...props} isFetched />);

    expect(fetchReelRaces).toBeCalledTimes(1);
  });

  test("subscription to reel race channels on mount", () => {
    expect(props.subscribeReelRacesUpdates).toBeCalledTimes(1);
  });

  test("unsubscription to reel race channels on unmount", () => {
    rendered.unmount();

    expect(props.unsubscribeReelRacesUpdates).toBeCalledTimes(1);
  });
});
