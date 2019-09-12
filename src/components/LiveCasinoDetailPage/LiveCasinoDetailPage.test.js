// @flow
import React from "react";
import { shallow } from "enzyme";
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
    expect(
      rendered.find({ "data-test-id": "live-casino-detail-list" }).length
    ).toBe(2);
    // ...first list with 2 rows...
    expect(
      rendered
        .find({ "data-test-id": "live-casino-detail-list" })
        .at(0)
        .find(GameRow).length
    ).toBe(2);
    // ...second list with one row...
    expect(
      rendered
        .find({ "data-test-id": "live-casino-detail-list" })
        .at(1)
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
