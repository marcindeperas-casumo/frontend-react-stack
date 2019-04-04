import React from "react";
import { shallow } from "enzyme";
import { ReelRaceCard } from "./ReelRaceCard";

const props = {
  spinLimit: 666,
  minBet: "€0.50",
  prize: "€666",
  color: "#ffd073",
  game: {
    logo:
      "https://images.casumo.com/2014/06/GonzosQuest_Thumb.jpg?w=64&fit=crop&markscale=100&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1&h=64&crop=top%2Cleft&mark=https%3A%2F%2Fimages.casumo.com%2F2014%2F02%2FGonzosQuest_Logo.png",
    name: "Gonzo's Quest",
  },
  t: {
    spins: "Spins",
    duration: "Duration",
    minBet: "Min Bet",
    startingIn: "Starting in",
    endingIn: "Ending in",
    optIn: "Opt In",
    optedIn: "Opted In",
    play: "Play",
    prize: "Compete for",
  },
};
const minute = 60 * 1000;

describe("ReelRaceCard", () => {
  describe("Scheduled", () => {
    const now = Date.now();
    const rendered = shallow(
      <ReelRaceCard
        {...props}
        status="Scheduled"
        type="Standard"
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
        status="Scheduled"
        type="Standard"
        opted={true}
        startTime={now}
        endTime={now + 30 * minute}
      />
    );

    test('should show "Ending In" text', () => {
      expect(rendered.contains("Ending in")).toBe(true);
    });

    test('should show "Play" button', () => {
      expect(rendered.find("Button").contains("Play")).toBe(true);
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
        status="Scheduled"
        type="Promoted"
        opted={true}
        startTime={now}
        endTime={now + 30 * minute}
      />
    );

    expect(rendered.find(".c-reel-race__badge")).toHaveLength(1);
  });
});
