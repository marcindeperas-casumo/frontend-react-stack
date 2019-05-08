import React from "react";
import { shallow } from "enzyme";
import { GameRowSkeleton } from "Components/GameRowSkeleton";

describe("GameRowSkeleton", () => {
  test("should render a skeleton", () => {
    const rendered = shallow(<GameRowSkeleton />);
    expect(rendered.find("Skeleton").length).toBe(1);
  });
});
