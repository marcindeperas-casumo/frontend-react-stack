import React from "react";
import { shallow } from "enzyme";

import CardData from "Components/LiveCasinoCard/LiveCasinoCardData";
import { topCardLetters } from "./utils";

import roulette from "./__mocks__/Roulette.json";
import topCard from "./__mocks__/TopCard.json";
import moneyWheel from "./__mocks__/MoneyWheel.json";
import blackjack from "./__mocks__/Blackjack.json";
import blackjackFull from "./__mocks__/BlackjackFull.json";

describe("LiveCasinoCardData", () => {
  describe("Roulette", () => {
    test("renders 5 badges with correct values", () => {
      const component = shallow(<CardData lobby={roulette.lobby} />);
      expect(component.find("Badge")).toHaveLength(5);

      const results = roulette.lobby.results.slice(0, 5);
      const rendered = [];
      component.find("Badge").forEach(node => {
        rendered.push(node.props().children.toString());
      });
      expect(rendered).toEqual(results);
    });

    test("renders recent numbers text", () => {
      const component = shallow(<CardData lobby={roulette.lobby} />);
      const cmsField = component.find("Connect(CMSField)").props().field;
      expect(cmsField).toEqual("recent_numbers");
    });
  });

  describe("TopCard (Football Studio)", () => {
    test("renders 5 badges with Football letter results", () => {
      const component = shallow(<CardData lobby={topCard.lobby} />);
      expect(component.find("Badge")).toHaveLength(5);

      const results = topCard.lobby.results
        .slice(0, 5)
        .map(v => topCardLetters[v]);
      const rendered = [];
      component.find("Badge").forEach(node => {
        rendered.push(node.props().children.toString());
      });
      expect(rendered).toEqual(results);
    });

    test("should render recent letters text", () => {
      const component = shallow(<CardData lobby={topCard.lobby} />);
      const cmsField = component.find("Connect(CMSField)").props().field;
      expect(cmsField).toEqual("recent_letters");
    });
  });

  describe("MoneyWheel", () => {
    test("renders the 5 badges values with no leading 0", () => {
      const component = shallow(<CardData lobby={moneyWheel.lobby} />);
      expect(component.find("Badge")).toHaveLength(5);

      const results = moneyWheel.lobby.results
        .slice(0, 5)
        .map(n => (isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)).toString());
      const rendered = [];
      component.find("Badge").forEach(node => {
        rendered.push(node.props().children.toString());
      });
      expect(rendered).toEqual(results);
    });

    test("should render recent letters text", () => {
      const component = shallow(<CardData lobby={moneyWheel.lobby} />);
      const cmsField = component.find("Connect(CMSField)").props().field;
      expect(cmsField).toEqual("recent_numbers");
    });
  });

  describe("Blackjack (Open Seats)", () => {
    test("renders 1 badge", () => {
      const component = shallow(<CardData lobby={blackjack.lobby} />);
      expect(component.find("Badge").props().children).toEqual(7);
    });

    test("should render open seats text", () => {
      const component = shallow(<CardData lobby={blackjack.lobby} />);
      const cmsField = component.find("Connect(CMSField)").props().field;
      expect(cmsField).toEqual("open_seats");
    });
  });

  describe("Blackjack No Seats", () => {
    test("renders 1 badge bet with behind text", () => {
      const component = shallow(<CardData lobby={blackjackFull.lobby} />);
      const cmsField = component
        .find("Badge")
        .children()
        .props().field;
      expect(cmsField).toEqual("bet_behind");
    });

    test("renders bet behind text", () => {
      const component = shallow(<CardData lobby={blackjackFull.lobby} />);
      const cmsField = component
        .find("Text")
        .find("Connect(CMSField)")
        .props().field;
      expect(cmsField).toEqual("table_full");
    });
  });
});
