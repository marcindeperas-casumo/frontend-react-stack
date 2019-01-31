import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import GameRow from "Components/GameRow/GameRow";
import SectionTitle from "./SectionTitle";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";

import roulette from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import moneyWheel from "Components/LiveCasinoCard/__mocks__/MoneyWheel.json";

const data = [
  //
  { id: "roulette", title: "Roulette", gamesInSection: [roulette, roulette] },
  { id: "mw", title: "Money Wheel", gamesInSection: [moneyWheel] },
];

describe("<LiveCasinoDetailPage />", () => {
  test("renders correctly", () => {
    const rendered = shallow(<LiveCasinoDetailPage gamesList={data} />);
    // Two titles...
    expect(rendered.find(SectionTitle).length).toBe(2);
    // ...each with lists...
    expect(rendered.find(List).length).toBe(2);
    // ...first list with 2 rows...
    expect(
      rendered
        .find(List)
        .at(0)
        .dive()
        .find(GameRow).length
    ).toBe(2);
    // ...second list with one row...
    expect(
      rendered
        .find(List)
        .at(1)
        .dive()
        .find(GameRow).length
    ).toBe(1);
  });
});
