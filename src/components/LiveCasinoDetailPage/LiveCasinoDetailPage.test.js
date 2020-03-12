// @flow
import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import SectionTitle from "./SectionTitle";
import { LiveCasinoDetailPage } from "./LiveCasinoDetailPage";

const groupedLiveCasinoGames = [
  { title: "Roulette", games: ["1", "2"] },
  { title: "MoneyWheel", games: ["3"] },
];

describe("<LiveCasinoDetailPage />", () => {
  test("renders correctly", () => {
    const rendered = shallow(
      <LiveCasinoDetailPage groupedLiveCasinoGames={groupedLiveCasinoGames} />
    );
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
        .find("li").length
    ).toBe(2);
    // ...second list with one row...
    expect(
      rendered
        .find(List)
        .at(1)
        .dive()
        .find("li").length
    ).toBe(1);
  });
});
