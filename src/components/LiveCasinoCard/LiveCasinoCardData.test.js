import React from "react";
import { shallow } from "enzyme";
import Text from "@casumo/cmp-text";
import { LiveCasinoCardData } from "Components/LiveCasinoCard/LiveCasinoCardData";
import { topCardLettersDisplay } from "./utils";
import roulette from "./__mocks__/Roulette.json";
import topCard from "./__mocks__/TopCard.json";
import moneyWheel from "./__mocks__/MoneyWheel.json";
import blackjack from "./__mocks__/Blackjack.json";
import blackjackFull from "./__mocks__/BlackjackFull.json";

describe("LiveCasinoCardData", () => {
  describe("Roulette", () => {
    test("renders 10 results with correct values", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={roulette.lobby} />
      );
      const results = roulette.lobby.results.slice(0, 10);
      const numbersTexts = component
        .find("LobbyType")
        .shallow()
        .find(Text);
      const rendered = numbersTexts.map(node =>
        node.props().children.toString()
      );

      expect(rendered).toEqual(results);
      expect(numbersTexts).toHaveLength(10);
    });
  });

  describe("TopCard (Football Studio)", () => {
    test("renders 10 Football letter results", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={topCard.lobby} />
      );
      const data = component.find("LobbyType").shallow();
      const results = topCard.lobby.results
        .slice(0, 10)
        .map(v => topCardLettersDisplay[v]);
      const rendered = data
        .find(Text)
        .map(node => node.props().children.toString());
      expect(rendered).toEqual(results);
      expect(data.find(Text)).toHaveLength(10);
    });
  });

  describe("MoneyWheel", () => {
    test("renders 10 results with no leading 0", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={moneyWheel.lobby} />
      );
      const data = component.find("LobbyType").shallow();
      const results = moneyWheel.lobby.results
        .slice(0, 10)
        .map(n => (isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)).toString());
      const rendered = data
        .find(Text)
        .map(node => node.props().children.toString());

      expect(rendered).toEqual(results);
      expect(data.find(Text)).toHaveLength(10);
    });
  });

  describe("Blackjack (Open Seats)", () => {
    test("should render open seats text", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={blackjack.lobby} />
      );
      const data = component.find("LobbyType").shallow();
      const cmsField = data.find("Connect(CMSField)").props().field;

      expect(cmsField).toEqual("open_seats");
    });
  });

  describe("Blackjack No Seats", () => {
    test("renders bet behind text", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={blackjackFull.lobby} />
      );
      const data = component.find("LobbyType").shallow();
      const cmsField = data
        .find(Text)
        .find("Connect(CMSField)")
        .props().field;

      expect(cmsField).toEqual("bet_behind");
    });
  });
});
