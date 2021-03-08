import List from "@casumo/cmp-list";
import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { GameListVertical } from "./GameListVertical";
import { games } from "./__mock__";

describe("<GameListVertical />", () => {
  test("should render a list", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isInMaintenance: boolean; backgroundImage:... Remove this comment to see the full error message
      <GameListVertical games={games} loading={false} />
    );

    expect(rendered.find("List")).toHaveLength(1);
  });

  test("should render a <GameRow /> component for each game", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isInMaintenance: boolean; backgroundImage:... Remove this comment to see the full error message
      <GameListVertical games={games} loading={false} />
    );

    const list = rendered.find(List).dive();

    expect(list.find(GameRow)).toHaveLength(games.length);
  });

  test("should render a <GameListSkeleton /> component if the data is loading", () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isInMaintenance: boolean; backgroundImage:... Remove this comment to see the full error message
    const rendered = shallow(<GameListVertical games={games} loading={true} />);

    expect(rendered.find(GameListSkeleton)).toHaveLength(1);
  });

  test("should render nothing if the data is not available", () => {
    const rendered = shallow(<GameListVertical games={null} loading={false} />);

    expect(rendered.isEmptyRender()).toBe(true);
  });
});
