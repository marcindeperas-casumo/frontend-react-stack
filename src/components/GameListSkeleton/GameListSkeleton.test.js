import React from "react";
import { shallow } from "enzyme";
import { GameListSkeleton } from "./GameListSkeleton";

describe("GameListSkeleton", () => {
  test("should render 8 GameRowSkeleton if not specified", () => {
    const rendered = shallow(<GameListSkeleton hasTitle={false} />);

    expect(rendered.find("GameRowSkeleton").length).toBe(8);
    expect(rendered.find("Skeleton").length).toBe(0);
  });

  test("should render as many GameRowSkeleton as specified on the props", () => {
    const rendered = shallow(
      <GameListSkeleton numberOfItems={12} hasTitle={false} />
    );

    expect(rendered.find("GameRowSkeleton").length).toBe(12);
    expect(rendered.find("Skeleton").length).toBe(0);
  });

  test("should render a title if hasTitle is set to true", () => {
    const rendered = shallow(<GameListSkeleton hasTitle={true} />);

    expect(rendered.find("Skeleton").length).toBe(1);
  });
});
