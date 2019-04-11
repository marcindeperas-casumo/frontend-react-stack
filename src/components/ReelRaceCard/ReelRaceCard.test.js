// @flow
import React from "react";
import { shallow } from "enzyme";
import { ReelRaceCard } from "./ReelRaceCard";

const props = {
  tournamentId: "1",
  color: "yellow-light-1",
  spins: 666,
  minBet: "€0.50",
  prize: "€666",
  gameSlug: "gonzos-quest",
  game: {
    name: "Gonzo&#8217;s Quest",
    slug: "gonzos-quest",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
    hasPlayForFun: true,
    inMaintenanceMode: false,
    jackpotInfo: null,
    lobby: null,
  },
  t: {
    spins: "Spins",
    duration: "Duration",
    duration_template: "{{duration}} min",
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

describe("ReelRaceCard", () => {
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
      expect(rendered.contains("Starting in")).toBe(true);
    });
    test('should show "Opt In" button', () => {
      expect(rendered.contains("Opt In")).toBe(true);
    });

    test('should show "Opted In" button if user opted for race', () => {
      rendered.setProps({ opted: true });
      expect(rendered.contains("Opted In")).toBe(true);
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
      />
    );

    test('should show "Ending In" text', () => {
      expect(rendered.contains("Ending in")).toBe(true);
    });

    test('should show "Play" button', () => {
      expect(
        rendered
          .find("Button")
          .children()
          .contains("Play")
      ).toBe(true);
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
