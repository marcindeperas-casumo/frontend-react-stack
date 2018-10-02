import React from "react";
import { mount } from "enzyme";

import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";

import curatedGame from "./__mocks__/curatedGame.json";

let component;

describe("CuratedCardBackground", () => {
  let images;

  beforeEach(() => {
    images = curatedGame.fields;
    component = mount(<CuratedCardBackground images={images} />);
  });

  it("should render the image", () => {
    const url = component
      .find("img")
      .prop("src")
      .split("?")[0]
      .replace(
        "https://images.casumo.com",
        "https://cms.casumo.com/wp-content/uploads"
      );
    expect(url).toEqual(images.small_image);
  });

  afterEach(() => component.unmount());
});
