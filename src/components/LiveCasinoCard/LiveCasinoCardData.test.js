import React from "react";
import { shallow } from "enzyme";
import CardData from "Components/LiveCasinoCard/LiveCasinoCardData";
import { topCardLettersDisplay } from "./utils";
import roulette from "./__mocks__/Roulette.json";
import topCard from "./__mocks__/TopCard.json";
import moneyWheel from "./__mocks__/MoneyWheel.json";
import blackjack from "./__mocks__/Blackjack.json";
import blackjackFull from "./__mocks__/BlackjackFull.json";

describe("LiveCasinoCardData", () => {
  describe("Roulette", () => {
    test("renders 9 badges with correct values", () => {
      const component = shallow(<CardData lobby={roulette.lobby} />);
      const results = roulette.lobby.results.slice(0, 9);
      const badges = component
        .find("LobbyType")
        .shallow()
        .find("Badge");
      const rendered = badges.map(node => node.props().children.toString());

      expect(rendered).toEqual(results);
      expect(badges).toHaveLength(9);
    });
  });

  describe("TopCard (Football Studio)", () => {
    test("renders 9 badges with Football letter results", () => {
      const component = shallow(<CardData lobby={topCard.lobby} />);
      const data = component.find("LobbyType").shallow();
      const results = topCard.lobby.results
        .slice(0, 9)
        .map(v => topCardLettersDisplay[v]);
      const rendered = data
        .find("Badge")
        .map(node => node.props().children.toString());
      expect(rendered).toEqual(results);
      expect(data.find("Badge")).toHaveLength(9);
    });
  });

  describe("MoneyWheel", () => {
    test("renders the 9 badges values with no leading 0", () => {
      const component = shallow(<CardData lobby={moneyWheel.lobby} />);
      const data = component.find("LobbyType").shallow();
      const results = moneyWheel.lobby.results
        .slice(0, 9)
        .map(n => (isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)).toString());
      const rendered = data
        .find("Badge")
        .map(node => node.props().children.toString());

      expect(rendered).toEqual(results);
      expect(data.find("Badge")).toHaveLength(9);
    });
  });

  describe("Blackjack (Open Seats)", () => {
    test("should render open seats text", () => {
      const component = shallow(<CardData lobby={blackjack.lobby} />);
      const data = component.find("LobbyType").shallow();
      const cmsField = data.find("Connect(CMSField)").props().field;

      expect(cmsField).toEqual("open_seats");
    });
  });

  describe("Blackjack No Seats", () => {
    test("renders bet behind text", () => {
      const component = shallow(<CardData lobby={blackjackFull.lobby} />);
      const data = component.find("LobbyType").shallow();
      const cmsField = data
        .find("Text")
        .find("Connect(CMSField)")
        .props().field;

      expect(cmsField).toEqual("bet_behind");
    });
  });
});
