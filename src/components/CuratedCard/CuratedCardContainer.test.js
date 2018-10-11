import React from "react";
import { mount } from "enzyme";

import CuratedCardContainer from "Components/CuratedCard";
import curatedCardData from "./__mocks__/curatedCard.json";

describe("CuratedCardContainer", () => {
  test("should render component", () => {
    const component = mount(<CuratedCardContainer />);
    expect(component.find("CuratedCardContainer").exists()).toBe(true);
  });

  test("should render CuratedCardSkeleton when loading", () => {
    const component = mount(<CuratedCardContainer />);
    expect(component.find("CuratedCardSkeleton").exists()).toBe(true);
  });

  test("should render CuratedCard when NOT loading", () => {
    const component = mount(<CuratedCardContainer />);
    component.setState({ data: curatedCardData, loading: false });
    expect(component.find("CuratedCard").exists()).toBe(true);
  });
});
