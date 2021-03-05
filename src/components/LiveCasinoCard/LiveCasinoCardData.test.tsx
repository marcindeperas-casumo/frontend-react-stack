import Text from "@casumo/cmp-text";
import React from "react";
import { shallow } from "enzyme";
import { LiveCasinoCardData } from "Components/LiveCasinoCard/LiveCasinoCardData";
import { topCardLettersDisplay } from "./utils";
import {
  Roulette,
  TopCard,
  MoneyWheel,
  Blackjack,
  BlackjackFull,
} from "./__mocks__";

const t = {
  bet_behind: "Bet behind",
  open_seats: "Seats left",
};

describe("LiveCasinoCardData", () => {
  describe("Roulette", () => {
    test("renders 10 results with correct values", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={Roulette.liveCasinoLobby} t={t} />
      );
      const results = Roulette.liveCasinoLobby.results.slice(0, 10);
      const numbersTexts = component.find("LobbyType").shallow().find(Text);
      const rendered = numbersTexts.map(node =>
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'unknow... Remove this comment to see the full error message
        node.props().children.toString()
      );

      expect(rendered).toEqual(results);
      expect(numbersTexts).toHaveLength(10);
    });
  });

  describe("TopCard (Football Studio)", () => {
    test("renders 10 Football letter results", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={TopCard.liveCasinoLobby} t={t} />
      );
      const data = component.find("LobbyType").shallow();
      const results = TopCard.liveCasinoLobby.results
        .slice(0, 10)
        .map(v => topCardLettersDisplay[v]);
      const rendered = data
        .find(Text)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'unknow... Remove this comment to see the full error message
        .map(node => node.props().children.toString());
      expect(rendered).toEqual(results);
      expect(data.find(Text)).toHaveLength(10);
    });
  });

  describe("MoneyWheel", () => {
    test("renders 10 results with no leading 0", () => {
      const component = shallow(
        <LiveCasinoCardData
          liveCasinoLobby={MoneyWheel.liveCasinoLobby}
          t={t}
        />
      );
      const data = component.find("LobbyType").shallow();
      const results = MoneyWheel.liveCasinoLobby.results
        .slice(0, 10)
        .map(n => (isNaN(parseInt(n, 10)) ? n : parseInt(n, 10)).toString());
      const rendered = data
        .find(Text)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'unknow... Remove this comment to see the full error message
        .map(node => node.props().children.toString());

      expect(rendered).toEqual(results);
      expect(data.find(Text)).toHaveLength(10);
    });
  });

  describe("Blackjack (Open Seats)", () => {
    test("should render open seats text", () => {
      const component = shallow(
        <LiveCasinoCardData liveCasinoLobby={Blackjack.liveCasinoLobby} t={t} />
      );
      const data = component.find("LobbyType").shallow();

      expect(data.find(Text).contains(t.open_seats)).toBe(true);
    });
  });

  describe("Blackjack No Seats", () => {
    test("renders bet behind text", () => {
      const component = shallow(
        <LiveCasinoCardData
          liveCasinoLobby={BlackjackFull.liveCasinoLobby}
          t={t}
        />
      );
      const data = component.find("LobbyType").shallow();

      expect(data.find(Text).contains(t.bet_behind)).toBe(true);
    });
  });
});
