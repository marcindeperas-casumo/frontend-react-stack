import React from "react";
import { shallow } from "enzyme";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";

describe("<MustDropJackpotList />", () => {
  const ids = ["one", "two", "three"];

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
    const list = rendered.find("List").dive();

    expect(list.find("GameRowContainer")).toHaveLength(ids.length);
  });

  test("should not render a <GameRow /> if ids is empty", () => {
    const ids = [];
    const rendered = shallow(
      <MustDropJackpotList ids={ids} areGamesLoaded={true} />
    );
    const list = rendered.find("List").dive();

    expect(list.find("GameRowContainer")).toHaveLength(0);
  });
});
