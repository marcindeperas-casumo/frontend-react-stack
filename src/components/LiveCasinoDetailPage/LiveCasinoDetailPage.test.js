// @flow
import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import { GameRow } from "Components/GameRow";
import SectionTitle from "./SectionTitle";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";

const data = [["Roulette", ["1", "2"]], ["MoneyWheel", ["3"]]];

describe("<LiveCasinoDetailPage />", () => {
  test("renders correctly", () => {
    const rendered = shallow(
      <LiveCasinoDetailPage
        groupedLiveGames={data}
        areTranslationsFetched
        translations={{}}
        fetchTranslations={() => {}}
        initFetchAllLiveGames={() => {}}
      />
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

  test("properly initializes data", () => {
    const initFetchAllLiveGames = jest.fn();
    shallow(
      <LiveCasinoDetailPage
        groupedLiveGames={data}
        areTranslationsFetched
        translations={{}}
        fetchTranslations={() => {}}
        initFetchAllLiveGames={initFetchAllLiveGames}
      />
    );

    expect(initFetchAllLiveGames).toBeCalledTimes(1);
  });
});
