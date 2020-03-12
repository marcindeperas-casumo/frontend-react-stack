import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import { MustDropJackpotList } from "Components/MustDropJackpotList/MustDropJackpotList";
import { GameRow } from "Components/GameRow/GameRow";
import jackpots from "./__mocks__/response.games.mock";

describe("<MustDropJackpotList />", () => {
  test("renders a <GameRow /> for each jackpot", () => {
    const rendered = shallow(<MustDropJackpotList jackpots={jackpots} />);

    const list = rendered.find(List).dive();
    expect(list.find(GameRow)).toHaveLength(jackpots.length);
  });

  test("should not render a <GameRow /> if ids is empty", () => {
    const rendered = shallow(<MustDropJackpotList jackpots={[]} />);
    const list = rendered.find(List).dive();

    expect(list.find(GameRow)).toHaveLength(0);
  });
});
