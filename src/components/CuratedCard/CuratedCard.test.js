import React from "react";
import { mount } from "enzyme";

import CuratedCard from "Components/CuratedCard";
import MockStore from "Components/MockStore";

describe("CuratedCard", () => {
  const component = mount(
    <MockStore>
      <CuratedCard />
    </MockStore>
  );

  test("should render component", () =>
    expect(component.find("CuratedCard").exists()).toBe(true));

  test("should render ImageLazy background", () =>
    expect(component.find("ImageLazy").exists()).toBe(true));

  test("should render Card", () =>
    expect(component.find("Card").exists()).toBe(true));

  test("should render CuratedCardFooter", () =>
    expect(component.find("Card").exists()).toBe(true));

  test("should render header html", () => {
    const html = component
      .find("Card")
      .find("Text")
      .at(0)
      .render()
      .html();
    expect(html).toBe("TRY OUR<br> NEW<br> GAME");
  });
});
