import React from "react";
import { mount } from "enzyme";

import CardData from "./CardData";
import { topCardLetters } from "./utils";

import Roulette from "./__mocks__/Roulette.json";
import TopCard from "./__mocks__/TopCard.json";
import MoneyWheel from "./__mocks__/MoneyWheel.json";
import Blackjack from "./__mocks__/Blackjack.json";
import BlackjackFull from "./__mocks__/BlackjackFull.json";

let component;

describe("LiveCasinoCard CardData > Roulette", () => {
  let game = Roulette.lobby;

  beforeEach(() => {
    component = mount(<CardData {...game} />);
  });

  it("should render results", () => {
    expect(component.find("Matcher").prop("condition")).toEqual("results");
  });

  it("should render 5 badge values", () => {
    expect(component.find("Badge")).toHaveLength(5);

    const results = game.results.slice(0, 5);
    const rendered = [];
    component.find("Badge").forEach(node => {
      rendered.push(node.text());
    });
    expect(rendered).toEqual(results);
  });

  it("should render recent numbers text", () => {
    expect(component.find("CMSField").text()).toEqual("Recent numbers");
  });

  afterEach(() => component.unmount());
});

describe("LiveCasinoCard CardData > TopCard (Football Studio)", () => {
  let game = TopCard.lobby;

  beforeEach(() => {
    component = mount(<CardData {...game} />);
  });

  it("should render results", () => {
    expect(component.find("Matcher").prop("condition")).toEqual("results");
  });

  it("should render 5 badges values with Football letters", () => {
    expect(component.find("Badge")).toHaveLength(5);

    const results = game.results.slice(0, 5).map(v => topCardLetters[v]);
    const rendered = [];
    component.find("Badge").forEach(node => {
      rendered.push(node.text());
    });
    expect(rendered).toEqual(results);
  });

  it("should render recent letters text", () => {
    expect(component.find("CMSField").text()).toEqual("Recent letters");
  });

  afterEach(() => component.unmount());
});

describe("LiveCasinoCard CardData > MoneyWheel", () => {
  let game = MoneyWheel.lobby;

  beforeEach(() => {
    component = mount(<CardData {...game} />);
  });

  it("should render results", () => {
    expect(component.find("Matcher").prop("condition")).toEqual("results");
  });

  it("should render the 5 badges values with no leading 0", () => {
    expect(component.find("Badge")).toHaveLength(5);

    const results = game.results
      .slice(0, 5)
      .map(n => (isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)).toString());
    const rendered = [];
    component.find("Badge").forEach(node => {
      rendered.push(node.text());
    });
    expect(rendered).toEqual(results);
  });

  it("should render recent numbers text", () => {
    expect(component.find("CMSField").text()).toEqual("Recent numbers");
  });

  afterEach(() => component.unmount());
});

describe("LiveCasinoCard CardData > Blackjack", () => {
  let game = Blackjack.lobby;

  describe("Open Seats", () => {
    beforeEach(() => {
      component = mount(<CardData {...game} />);
    });

    it("should render results", () => {
      expect(component.find("Matcher").prop("condition")).toEqual("seats");
    });

    it("should render 1 badge", () => {
      expect(component.find("Badge").text()).toEqual("7");
    });

    it("should render open seats text", () => {
      expect(component.find("CMSField").text()).toEqual("Open seats");
    });

    afterEach(() => component.unmount());
  });

  describe("No Seats", () => {
    beforeEach(() => {
      game.seats = 0;
      component = mount(<CardData {...game} />);
    });

    it("should render 1 badge bet with behind text", () => {
      expect(
        component
          .find("Badge")
          .first()
          .text()
      ).toEqual("Bet behind");
    });

    it("should render bet behind text", () => {
      expect(
        component
          .find("CMSField")
          .last()
          .text()
      ).toEqual("Table full");
    });
  });
});
