import React from "react";
import { mount } from "enzyme";
import { getImgixUrl } from "@casumo/cudl-react-utils";

import CuratedCardFooter from "Components/CuratedCard/CuratedCardFooter";
import curatedCardData from "./__mocks__/curatedCard.json";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";

describe("CuratedCardFooter", () => {
  const { game } = curatedCardData;
  const { primary_action_text } = curatedCardData.fields;

  test("should render component", () => {
    const component = mount(<CuratedCardFooter game={game} />);
    expect(component.find("CuratedCardFooter").exists()).toBe(true);
  });

  test("should render LowRes imgix logoBackground src", () => {
    const component = mount(<CuratedCardFooter game={game} />);
    const { imgixOpts } = LOW_RES_IMAGE_SETTINGS;
    const expected = getImgixUrl(game.logoBackground, null, imgixOpts);
    expect(component.find("img").prop("src")).toEqual(expected);
  });

  test("should render Button PlayIcon svg", () => {
    const component = mount(<CuratedCardFooter game={game} />);
    const svg = component
      .find("Button")
      .find("PlayIcon")
      .find("svg");
    expect(svg.exists()).toBe(true);
  });

  test("should render Button Play text", () => {
    const component = mount(
      <CuratedCardFooter game={game} primaryActionText={primary_action_text} />
    );
    const text = component
      .find("Button")
      .at(0)
      .find("span")
      .text();
    expect(text).toBe(primary_action_text);
  });

  test("should render Button more with MoreIcon svg", () => {
    const component = mount(<CuratedCardFooter game={game} />);
    const svg = component
      .find("Button")
      .at(1)
      .find("svg");
    expect(svg.exists()).toBe(true);
  });
});
