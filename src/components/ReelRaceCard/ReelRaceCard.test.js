// @flow
import React from "react";
import { shallow } from "enzyme";
import { PLAYING_STATE } from "Models/playing";
import { ReelRaceCard } from "./ReelRaceCard";

const props = {
  tournamentId: "1",
  color: "yellow-light-1",
  spins: 666,
  minBet: "€0.50",
  prize: "€666",
  gameSlug: "gonzos-quest",
  status: "Scheduled",
  game: {
    name: "Gonzo&#8217;s Quest",
    slug: "gonzos-quest",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
    jackpot: null,
    lobby: null,
  },
  t: {
    spins: "Spins",
    duration: "Duration",
    duration_template: "{{{duration}}} min",
    min_bet: "Min Bet",
    starting_in: "Starting in",
    ending_in: "Ending in",
    opt_in: "Opt In",
    opted_in: "Opted In",
    opted_in_cta_single_game_short: "Play",
    compete_for: "Compete for {{prize}}",
    title: "Reel Races",
    caveat_short: "false",
  },
  launchGame: () => {},
  optIn: () => {},
};
const minute = 60 * 1000;

const launchGame = jest.fn();

describe("ReelRaceCard", () => {
  describe("Empty game object", () => {
    const propsNoGame = {
      tournamentId: "1",
      color: "yellow-light-1",
      spins: 666,
      minBet: "€0.50",
      prize: "€666",
      gameSlug: "gonzos-quest",
      // $FlowFixMe
      game: {},
      t: {
        spins: "Spins",
        duration: "Duration",
        duration_template: "{{{duration}}} min",
        min_bet: "Min Bet",
        starting_in: "Starting in",
        ending_in: "Ending in",
        opt_in: "Opt In",
        opted_in: "Opted In",
        opted_in_cta_single_game_short: "Play",
        compete_for: "Compete for {{prize}}",
        title: "Reel Races",
        caveat_short: "false",
      },
      launchGame: () => {},
      optIn: () => {},
      status: "Scheduled",
      playing: {
        state: PLAYING_STATE.STARTED,
        gameId: "foo",
      },
    };

    const now = Date.now();
    const rendered = shallow(
      <ReelRaceCard
        {...propsNoGame}
        promoted={false}
        opted={false}
        startTime={now + 30 * minute}
        endTime={now + 60 * minute}
      />
    );

    test("should not show any card if game object is empty", () => {
      expect(rendered.isEmptyRender()).toEqual(true);
    });
  });

  describe("Scheduled", () => {
    const now = Date.now();
    const rendered = shallow(
      <ReelRaceCard
        {...props}
        promoted={false}
        opted={false}
        startTime={now + 30 * minute}
        endTime={now + 60 * minute}
      />
    );

    test('should show "Starting In" text', () => {
      expect(rendered.contains(props.t.starting_in)).toBe(true);
    });
    test('should show "Opt In" button', () => {
      expect(
        rendered
          .find("OptInButton")
          .dive()
          .contains(props.t.opt_in)
      ).toBe(true);
    });

    test('should show "Opted In" button if user opted for race', () => {
      rendered.setProps({ opted: true });
      expect(
        rendered
          .find("OptInButton")
          .dive()
          .contains(props.t.opted_in)
      ).toBe(true);
    });
  });

  describe("Ongoing", () => {
    const now = Date.now();
    const rendered = shallow(
      <ReelRaceCard
        {...props}
        promoted={false}
        opted
        startTime={now}
        endTime={now + 30 * minute}
        launchGame={launchGame}
      />
    );

    test('should show "Ending In" text', () => {
      expect(rendered.contains(props.t.ending_in)).toBe(true);
    });

    test('should show "Play" button', () => {
      expect(
        rendered
          .find("Button")
          .children()
          .contains(props.t.opted_in_cta_single_game_short)
      ).toBe(true);
    });

    test("should launch game if click on game info", () => {
      expect(launchGame).toHaveBeenCalledTimes(0);

      rendered
        .find("Flex.u-cursor-pointer")
        .first()
        .simulate("click");

      expect(launchGame).toHaveBeenCalledTimes(1);
    });

    test("shouldn't contain promoted badge", () => {
      expect(rendered.find(".c-reel-race__badge")).toHaveLength(0);
    });
  });

  test("should show promoted badge", () => {
    const now = Date.now();
    const rendered = shallow(
      <ReelRaceCard
        {...props}
        promoted
        opted
        startTime={now}
        endTime={now + 30 * minute}
      />
    );

    expect(rendered.find(".c-reel-race__badge")).toHaveLength(1);
  });
});
