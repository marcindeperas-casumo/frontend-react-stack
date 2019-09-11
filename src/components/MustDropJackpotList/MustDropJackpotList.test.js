import React from "react";
import { shallow } from "enzyme";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";
import { GameRow } from "Components/GameRow";

const ids = ["one", "two", "three"];
describe("<MustDropJackpotList />", () => {
  test("calls initFetchTopLists if areGamesLoaded is false", () => {
    const initFetchTopLists = jest.fn();
    shallow(
      <MustDropJackpotList
        ids={ids}
        areGamesLoaded={false}
        initFetchTopLists={initFetchTopLists}
      />
    );

    expect(initFetchTopLists).toBeCalledTimes(1);
  });

  test("does not call initFetchTopLists if areGamesLoaded is true", () => {
    const initFetchTopLists = jest.fn();
    shallow(
      <MustDropJackpotList
        ids={ids}
        areGamesLoaded={true}
        initFetchTopLists={initFetchTopLists}
      />
    );

    expect(initFetchTopLists).toBeCalledTimes(0);
  });

  test("renders a <GameRow /> for each id", () => {
    const rendered = shallow(
      <MustDropJackpotList ids={ids} areGamesLoaded={true} />
    );
    expect(rendered.find(GameRow)).toHaveLength(ids.length);
  });

  test("should not render a <GameRow /> if ids is empty", () => {
    const rendered = shallow(
      <MustDropJackpotList ids={[]} areGamesLoaded={true} />
    );
    expect(rendered.find(GameRow)).toHaveLength(0);
  });
});
